import { Injectable } from '@angular/core';
import { Product } from '../_models/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistServices {
  private wishlist: Product[] = [];
  private wishlistCount = new BehaviorSubject<number>(0);
  wishlistCount$ = this.wishlistCount.asObservable();

  constructor() {
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      this.wishlist = JSON.parse(saved);
      this.wishlistCount.next(this.wishlist.length);
    }
  }

  getWishlist(): Product[] {
    return this.wishlist;
  }

  add(product: Product) {
    this.wishlist.push(product);
    this.save();
    this.wishlistCount.next(this.wishlist.length);
  }

  remove(index: number) {
    this.wishlist.splice(index, 1);
    this.save();
    this.wishlistCount.next(this.wishlist.length);
  }

  private save() {
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
  }
}
