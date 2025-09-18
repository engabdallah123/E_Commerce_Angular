import { Component, OnInit } from '@angular/core';
import { CartServices, CartItem } from '../../_services/cart-services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cart-component.html',
  styleUrls: ['./cart-component.css'],
})
export class CartComponent implements OnInit {
  cart: CartItem[] = [];
  total: number = 0;

  constructor(private cartService: CartServices) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cart = this.cartService.getCart();
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.cart.reduce(
      (sum, item) => sum + (item.product.price ?? 0) * item.quantity,
      0
    );
  }

  changeQuantity(index: number, newQty: number) {
    if (newQty < 1) return;
    this.cartService.updateQuantity(index, newQty);
    this.loadCart();
  }

  removeItem(index: number) {
    this.cartService.removeFromCart(index);
    this.loadCart();
  }

  get totalItems(): number {
    return this.cart.reduce((sum, i) => sum + i.quantity, 0);
  }

  clearAllItem() {
    Swal.fire({
      title: 'Do you want to clear the cart?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.cartService.clearCart();
        this.loadCart();
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
