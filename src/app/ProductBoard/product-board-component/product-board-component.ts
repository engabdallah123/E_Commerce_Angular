import { Component, OnInit } from '@angular/core';
import { ProductServices } from '../../_services/product-services';
import { Product } from '../../_models/product';
import { GetOrderDto, OrderServices } from '../../_services/order-services';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-board',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-board-component.html',
  styleUrls: ['./product-board-component.css'],
})
export class ProductBoardComponent implements OnInit {
  editForm!: FormGroup;
  isEditMode = false;
  selectedProductId: number | null = null;

  constructor(
    private productServices: ProductServices,
    private orderServices: OrderServices
  ) {
    this.editForm = new FormGroup({
      name: new FormControl(``),
      price: new FormControl(0),
      stock: new FormControl(0),
      rating: new FormControl(0, [Validators.min(0), Validators.max(5)]),
    });
  }

  allProducts: Product[] = [];
  products: Product[] = [];
  orders: GetOrderDto[] = [];

  // sorting state
  sortedColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  ngOnInit(): void {
    this.loadProducts();
    this.loadOrders();
  }

  loadProducts(): void {
    this.productServices.getAllProducts().subscribe({
      next: (res: any) => {
        this.allProducts = Array.isArray(res)
          ? res
          : res.data && Array.isArray(res.data)
          ? res.data
          : [res];
      },
      error: (err) => console.error(err),
    });

    this.productServices.getRatingProducts().subscribe({
      next: (res: any) => {
        this.products = Array.isArray(res)
          ? res
          : res.data && Array.isArray(res.data)
          ? res.data
          : [res];
      },
      error: (err) => console.error(err),
    });
  }

  loadOrders(): void {
    this.orderServices.GetAllOrder().subscribe({
      next: (res) => {
        this.orders = res;
      },
      error: (err) => console.error(err),
    });
  }

  // ✅ ترتيب البيانات
  sortData(column: string): void {
    if (this.sortedColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedColumn = column;
      this.sortDirection = 'asc';
    }

    this.allProducts.sort((a: any, b: any) => {
      const valueA = a[column];
      const valueB = b[column];
      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // ✅ تحويل رقم إلى Array عشان تعمل نجوم
  getStars(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }

  editProduct(product: Product): void {
    this.isEditMode = true;
    this.selectedProductId = product.id;

    this.editForm.patchValue({
      name: product.name,
      price: product.price,
      stock: product.stock,
      rating: product.rating,
    });
  }

  closeEditForm(): void {
    this.isEditMode = false;
    this.selectedProductId = null;
    this.editForm.reset();
  }

  saveEdit(): void {
    if (this.editForm.invalid || !this.selectedProductId) return;

    this.productServices
      .EditeProduct(this.selectedProductId, this.editForm.value)
      .subscribe({
        next: () => {
          this.loadProducts();
          this.closeEditForm();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Product Edited Successfully',
            showConfirmButton: false,
            timer: 1000,
            customClass: {
              popup: 'my-swal',
            },
          });
        },
        error: (err) => console.log(err),
      });
  }

  deleteProduct(id: number): void {
    Swal.fire({
      title: 'Delete This Product?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.productServices.DeleteProduct(id).subscribe({
          next: () => {
            this.loadProducts();
          },
        });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }
  // get images
  getImageUrl(url: any): string {
    if (!url) return 'assets/default.png'; // صورة افتراضية

    const strUrl = String(url); //  forever return it to string

    if (strUrl.startsWith('http')) {
      return strUrl; // from internet
    }

    return 'http://localhost:5104' + strUrl; // from my server
  }
}
