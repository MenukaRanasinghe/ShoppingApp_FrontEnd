
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];

  getCartItems(): any[] {
    return this.cartItems;
  }

  addToCart(product: any): void {
    this.cartItems.push(product);
  }
}
