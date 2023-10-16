import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cartservice/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  constructor(public cartService:CartService) { }

  getCartItems() {
    return this.cartService.items;
  }

  reserveBooks() {
    this.cartService.reserveBooks();
  }

  clearCart() {
    this.cartService.removeAllBooksFromCart();
  }

  removeBookFromCart(bookId: number) {
    this.cartService.removeBookFromCart(bookId);
  }

}
