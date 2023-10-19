import { Component } from '@angular/core';
import { BookService } from 'src/app/services/bookservice/book.service';
import { AuthService } from 'src/app/services/security/auth.service';
import { ThemeService } from 'src/app/theme.service';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/services/searchservice/search.service';
import { BorrowedbookService } from 'src/app/services/borrowedbookservice/borrowedbook.service';
import { CartService } from 'src/app/services/cartservice/cart.service';
import { UserService } from 'src/app/services/userservice/user.service';
import { MatDialog } from '@angular/material/dialog';
import { BookDescriptionDialogComponent } from 'src/app/description/book-description-dialog/book-description-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  private searchSubscription: Subscription | undefined;

  username: string = '';
  email: string = '';
 
  books: any[] = [];
  borrowedBooks: any[] = [];

  constructor(private themeService: ThemeService, 
    private authService:AuthService,
    private bookService:BookService,
    private searchService:SearchService,
    private borrowedBookService: BorrowedbookService,
    private cartService:CartService,
    private userService:UserService,
    public dialog: MatDialog) {}

  
    openDescriptionDialog(book:any): void {
      const dialogRef = this.dialog.open(BookDescriptionDialogComponent, {
        data: { title: book.title, description: book.description }
      });
    }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  ngOnInit() {

    this.getUserInfo();

    this.getAllBooks();

    this.getBorrowedBooks();

    this.searchSubscription = this.searchService.searchObservable.pipe(
      switchMap(query => {
        if (query !== null) {
          return this.bookService.searchBooks(query);
        } else {
          return [];
        }
      })
    ).subscribe({
      next: data => {
        this.books = data;
        console.log('Books: ', this.books);
        
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  // Get username and email
  getUserInfo(): void {
    this.userService.getUserInfo()
      .then(data => {
      this.username = data.username;
      this.email = data.email;
    }).catch(error => { 
      console.error('There was an error!', error);
    });
  }

  //Get all books
  getAllBooks() {
    this.bookService.getAllBooks().then(data => {
      this.books = data;
      console.log('Books: ', this.books);
    }).catch(error => {
      console.error('There was an error!', error);
    });
  }

  //Get all Borrowed books
  getBorrowedBooks() {
    this.borrowedBookService.getActiveBorrowedBooks().then(data => {
      this.borrowedBooks = data;
      console.log('Books: ', this.books);
    }).catch(error => {
      console.error('There was an error!', error);
    });
  }

  // Cart
  addToCart(book: any): boolean {

    if (this.cartService.isBookInCart(book)) {
      alert('Book is already in cart!');
      return false;
    }

    if (this.cartService.addToCart(book)) {
      return true;
    }

    alert('Cart is full!');
    return false;
  }

  get cartItemCount(): number {
    return this.cartService.items.length;
  }

  get cartItems(): any[] {
    return this.cartService.items;
  }

  clearCart(): void {
    this.cartService.removeAllBooksFromCart();
  }

  bookIsInCart(book: any): boolean {  
    return this.cartService.isBookInCart(book);
  }


  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
  
  
}
