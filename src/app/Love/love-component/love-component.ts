import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { Product } from '../../_models/product';
import { Subscription } from 'rxjs';
import { WishlistServices } from '../../_services/wishlist-services';
import { CurrencyPipe } from '@angular/common';
import { CartServices } from '../../_services/cart-services';

@Component({
  selector: 'app-love-component',
  imports: [CurrencyPipe],
  templateUrl: './love-component.html',
  styleUrl: './love-component.css',
})
export class LoveComponent implements OnInit, OnDestroy {
  love: Product[] = [];
  private routeSub!: Subscription;

  constructor(
    public wishlistServices: WishlistServices,
    public cartServices: CartServices
  ) {}

  ngOnInit(): void {
    this.love = this.wishlistServices.getWishlist();
  }

  removeFromWishlist(index: number) {
    this.wishlistServices.remove(index);
    this.love = this.wishlistServices.getWishlist();
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }
  addToCart(prduct: Product) {
    this.cartServices.addToCart(prduct);
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
