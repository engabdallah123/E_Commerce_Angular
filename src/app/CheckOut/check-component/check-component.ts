import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartItem, CartServices } from '../../_services/cart-services';
import { AccountServices } from '../../_services/account-services';
import { OrderServices } from '../../_services/order-services';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


export interface OrderItemDto {
  productId: number;
  quantity: number;
  readonly unitPrice?: number;
}
export interface OrderDto {
  id?:number
  userId: string;
  paymentMethod: string;
  orderDate: string;
  orderStatus:string;
  custInfo: custInfo;
  items: OrderItemDto[];
}
export interface custInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

@Component({
  selector: 'app-check-component',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './check-component.html',
  styleUrl: './check-component.css',
})
export class CheckComponent implements OnInit {
  cart: CartItem[] = [];
  total: number = 0;

  checkOutForm: FormGroup;

  constructor(
    private cartService: CartServices,
    private accountService: AccountServices,
    private orderServices: OrderServices,
    private router: Router
  ) {
    this.checkOutForm = new FormGroup({
      name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{11}$/),
      ]),
    });
  }
  ngOnInit(): void {
    // get cart
    this.cart = this.cartService.getCart();
    this.total = this.cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }
  submitOrder() {
    if (this.checkOutForm.invalid) {
      this.checkOutForm.markAllAsTouched();
      return;
    }
    Swal.fire({
      title: 'Do you want to confirm the order?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const claims = this.accountService.GetClaims();

        const order: OrderDto = {
          userId: claims?.userID ?? ``, // من التوكن
          paymentMethod: 'Cash On Delivery',
          orderDate: new Date().toISOString(),
          orderStatus: `Pending`,
          items: this.cart.map((item) => ({
            productId: item.product?.id,
            quantity: item.quantity,
          })),
          custInfo: this.checkOutForm.value,
        };

        // send to API
        this.orderServices.CreateOrder(order).subscribe({
          next: (res) => {
            // clear cart
            this.cartService.clearCart();
            this.router.navigate(['/orderSuccess', res.id]);
          },
        });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }
  // get images
  getImageUrl(url: any): string {
    if (!url) return 'logo3.png'; // صورة افتراضية

    const strUrl = String(url); //  forever return it to string

    if (strUrl.startsWith('http')) {
      return strUrl; // from internet
    }

    return 'http://localhost:5104' + strUrl; // from my server
  }
}
