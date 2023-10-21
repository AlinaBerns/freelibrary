import { Component } from '@angular/core';
import { BorrowedBook, BorrowedBooksDialogComponent, BorrowedBooksDialogData, User } from '../../dialogs/borrowed-books-dialog/borrowed-books-dialog.component';
import { UserService } from 'src/app/services/userservice/user.service';
import { BorrowedbookService } from 'src/app/services/borrowedbookservice/borrowedbook.service';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from 'src/app/services/bookservice/book.service';
import { TabbedDialogComponent } from 'src/app/dialogs/tabbed-dialog/tabbed-dialog.component';
import { UtilsService } from 'src/app/services/security/utils.service';
import { Subscription, switchMap } from 'rxjs';
import { SearchService } from 'src/app/services/searchservice/search.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users: User[] = [];
  borrowedBooks: BorrowedBook[] = [];
  private searchSubscription: Subscription | undefined;

  constructor(
    private userService: UserService,
    private borrowedBookService: BorrowedbookService,
    private dialog: MatDialog,
    private Utils: UtilsService,
    private searchService: SearchService
  ) { }

  sortDirection: string = 'asc';

  ngOnInit(): void {
    this.userService.getAllUsers().then(users => {
      this.users = users;

      this.searchSubscription = this.searchService.searchObservable.pipe(
        switchMap(query => {
          if (query !== null) {
            return this.userService.searchUsers(query);
          } else {
            return [];
          }
        })
      ).subscribe({
        next: data => {
          this.users = data;
          console.log('users ', this.users);
          
        },
        error: error => {
          console.error('There was an error!', error);
        }
      });
      
    });
  }

  isAdmin(user:any): boolean {  
  
    const rolesArray = user.roles;

    const roleNamesArray = rolesArray.map((role: { name: any; }) => role.name);

    // Check if rolesArray is an array before proceeding
    if (Array.isArray(roleNamesArray)) {
      // Check if ROLE_ADMIN is in the array
      return roleNamesArray.includes('ROLE_ADMIN');
    }
  

  // Return false if rolesString is null or undefined, or if parsing fails
  return false;
  }
  

  sortDataByUsername() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.users.sort((a, b) => {
      return this.sortDirection === 'asc' ? a.username.localeCompare(b.username) : b.username.localeCompare(a.username);
    });
  }

  sortDataByEmail() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.users.sort((a, b) => {
      return this.sortDirection === 'asc' ? a.email.localeCompare(b.email) : b.email.localeCompare(a.email);
    });
  }

  sortDataById() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.users.sort((a, b) => {
      const idA = a.id;
      const idB = b.id;
  
      if (this.sortDirection === 'asc') {
        return idA - idB;
      } else {
        return idB - idA;
      }
    });
  }

  openTabbedDialog(userId: number): void {
    this.borrowedBookService.getBorrowedBooksFromUser(userId).then(allBooks => {
      // Filtering the books based on their status
      const borrowedBooks = allBooks.filter((book: { book: { status: string; }; }) => book.book.status === 'BORROWED');
      const reservedBooks = allBooks.filter((book: { book: { status: string; }; }) => book.book.status === 'RESERVED');
  
      // Opening the dialog with the filtered books
      const dialogRef = this.dialog.open(TabbedDialogComponent, {
        width: '550px',
        data: { borrowedBooks: borrowedBooks, reservedBooks: reservedBooks, userId: userId }
      });
    }).catch(error => {
      console.error('Error fetching borrowed books:', error);
    });
  }


  deleteUser(userId: number): void {
    this.userService.deleteUserById(userId);
    this.users = this.users.filter(user => user.id !== userId);
  }


  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }


}
