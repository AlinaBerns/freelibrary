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

  id: number = 0;
  username: string = '';
  email: string = '';
 
  books: any[] = [
    
  ];
  borrowedBooks: any[] = [];

  sortDirection: string = 'asc';

  constructor(private themeService: ThemeService, 
    private authService:AuthService,
    private bookService:BookService,
    private searchService:SearchService,
    private borrowedBookService: BorrowedbookService,
    private cartService:CartService,
    private userService:UserService,
    public dialog: MatDialog) {}
    
    sortDataByTitle() {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      this.borrowedBooks.sort((a, b) => {
        return this.sortDirection === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
      });
    }

    sortDataByData() {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      this.borrowedBooks.sort((a, b) => {
        return this.sortDirection === 'asc' ? a.dataOfReturn.localeCompare(b.dataOfReturn) : b.dataOfReturn.localeCompare(a.dataOfReturn);
      });
    }

    sortDataByStatus() {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      this.borrowedBooks.sort((a, b) => {
        return this.sortDirection === 'asc' ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status);});}
        
  
    openDescriptionDialog(book:any): void {
      const descriptionExample = 
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec imperdiet ligula ac mi condimentum cursus.'+ 
      'Pellentesque at quam sodales, pulvinar diam congue, efficitur dui. Donec dapibus tristique sem, '+
      'eu malesuada massa pretium a. Curabitur non congue ex. Sed ornare libero dolor, eget blandit risus congue sed. '+
      'Vestibulum facilisis justo non nisl ultricies, vitae rhoncus odio bibendum. Etiam quis purus at mi mollis hendrerit vel non sem.'+ 
      'Pellentesque semper est a justo imperdiet sagittis. Suspendisse at urna nec odio hendrerit lacinia et interdum lectus. Aliquam dictum vestibulum aliquet.'+ 
      'Proin mi urna, scelerisque sed consectetur porta, efficitur ultricies dui. Pellentesque purus ipsum, tristique eu vulputate non,'+ 
      'aliquet quis ligula. Sed pulvinar sed lectus sed euismod. Duis ac lectus non lorem semper suscipit. Quisque aliquet imperdiet sem vitae fringilla.'+

      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec imperdiet ligula ac mi condimentum cursus.'+ 
      'Pellentesque at quam sodales, pulvinar diam congue, efficitur dui. Donec dapibus tristique sem, '+
      'eu malesuada massa pretium a. Curabitur non congue ex. Sed ornare libero dolor, eget blandit risus congue sed. '+
      'Vestibulum facilisis justo non nisl ultricies, vitae rhoncus odio bibendum. Etiam quis purus at mi mollis hendrerit vel non sem.'+ 
      'Pellentesque semper est a justo imperdiet sagittis. Suspendisse at urna nec odio hendrerit lacinia et interdum lectus. Aliquam dictum vestibulum aliquet.'+ 
      'Proin mi urna, scelerisque sed consectetur porta, efficitur ultricies dui. Pellentesque purus ipsum, tristique eu vulputate non,'+ 
      'aliquet quis ligula. Sed pulvinar sed lectus sed euismod. Duis ac lectus non lorem semper suscipit. Quisque aliquet imperdiet sem vitae fringilla.';

      const dialogRef = this.dialog.open(BookDescriptionDialogComponent, {
        // data: { title: book.title, description: book.description }
        data: { title: book.title, description:descriptionExample }
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
      this.id = data.id;
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
      console.log('Borrowed Books: ', this.borrowedBooks);
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

