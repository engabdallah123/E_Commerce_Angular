import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ProductServices } from '../../../_services/product-services';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../../_models/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartServices } from '../../../_services/cart-services';
import { WishlistServices } from '../../../_services/wishlist-services';
import Swal from 'sweetalert2';
import { CategoryServices } from '../../../_services/category-services';
import { RelatedComponent } from "../Related/related-component/related-component";



@Component({
  selector: 'app-details-component',
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './details-component.html',
  styleUrl: './details-component.css',
})
export class DetailsComponent implements OnInit, OnDestroy {
  constructor(
    public productServices: ProductServices,
    public activatedRouter: ActivatedRoute,
    private cartService: CartServices,
    private wishlistServices: WishlistServices,
    public categoryServices: CategoryServices
  ) {}
  sub?: Subscription;
  product: Product | null = null;
  selectedImage!: string;
  selectedQuantity: number = 1;

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
  ngOnInit(): void {
    this.sub = this.activatedRouter.params.subscribe((data) => {
      this.productServices.getById(data[`id`]).subscribe((res) => {
        this.product = res;
        this.selectedImage = this.product.imageUrl[0];
      });
    });
  }
  changeImage(img: string) {
    this.selectedImage = img;
  }

  getStars(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }
  
  addToCart() {
    if (!this.product) return;
    this.cartService.addToCart(this.product, this.selectedQuantity);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Added To Cart Successfully',
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        popup: 'my-swal',
      },
    });
  }
  addToWishlist() {
    if (!this.product) return;
    this.wishlistServices.add(this.product);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Added To Wishlist Successfully',
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        popup: 'my-swal',
      },
    });
  }
  get dateShip(): Date {
    const today = new Date();
    today.setDate(today.getDate() + 3);
    return today;
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
