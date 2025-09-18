import { Injectable } from '@angular/core';
import { Product } from '../_models/product';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartServices {
  private cart: CartItem[] = [];
  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  constructor() {
    const saved = localStorage.getItem('cart');
    if (saved) {
      this.cart = JSON.parse(saved);
      this.updateCount();
    }
  }

  private save() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  private updateCount() {
    const totalCount = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    this.cartCount.next(totalCount);
  }

  getCart(): CartItem[] {
    return this.cart;
  }

  addToCart(product: Product, quantity: number = 1) {
    const index = this.cart.findIndex((i) => i.product.id === product.id);
    if (index > -1) {
      this.cart[index].quantity += quantity;
    } else {
      this.cart.push({ product, quantity });
    }
    this.save();
    this.updateCount();
  }

  updateQuantity(index: number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(index);
    } else {
      this.cart[index].quantity = quantity;
      this.save();
      this.updateCount();
    }
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
    this.save();
    this.updateCount();
  }
  clearCart() {
    this.cart = [];
    this.save();
    this.cartCount.next(0);
  }
}
