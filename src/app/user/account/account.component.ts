import { Component } from '@angular/core';
import { BorrowedbookService } from 'src/app/services/borrowedbookservice/borrowedbook.service';
import { UserService } from 'src/app/services/userservice/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  reservedBooks: any[] = [];

  sortDirection: string = 'asc';

  constructor(private userService:UserService, 
    private borrowedBookService: BorrowedbookService) { }

  id: number = 0;
  username: string = '';
  email: string = '';

  newUsername: string = '';
  newEmail: string = '';
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  disableOtherFields: boolean = false;
  activeField: string = '';

  ngOnInit(): void {
    this.getAllBorrwowedBooks();
    this.getUserInfo();
  }

  sortDataByTitle() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.reservedBooks.sort((a, b) => {
      return this.sortDirection === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
    });
  }

  sortDataByData() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.reservedBooks.sort((a, b) => {
      return this.sortDirection === 'asc' ? a.dataOfReturn.localeCompare(b.dataOfReturn) : b.dataOfReturn.localeCompare(a.yearOfRel);
    });
  }

  onInputChange(field: string): void {
    this.activeField = field;
    this.disableOtherFields = !!this.newUsername || !!this.newEmail || (field === 'password' && (!!this.oldPassword || !!this.newPassword || !!this.confirmPassword));
  }

  returnBook(bookId: number): void {
    this.borrowedBookService.returnBook(bookId);
    this.getAllBorrwowedBooks();
  }

  getAllBorrwowedBooks(): void {
    this.borrowedBookService.getActiveBorrowedBooks().then(data => {
      this.reservedBooks = data;
      console.log('Borrowed Books: ', this.reservedBooks);
    }).catch(error => {
      console.error('There was an error!', error);
    });
  }

  changePassword(): void {
    // Make a PUT request to the change password endpoint
    
    this.userService.checkPassword(this.oldPassword).then(response => {
      if(response && this.newPassword === this.confirmPassword){
        const user = {
          password: this.newPassword
        }
        this.userService.updateUserInfo(user);
      }
    })
  }

  getUserInfo(): void {
    this.userService.getUserInfo()
      .then(data => {
      this.id = data.id;
      this.username = data.username;
      this.email = data.email;
    }).catch(error => { 
      console.error('There was an error!', error);
    });
  }

  updateUserInfo(): void {
    // Make a PUT request to the update user info endpoint
    const user = {
      userName: this.newUsername,
      email: this.newEmail
    }
    this.userService.updateUserInfo(user);
  }

  deleteAccount(): void {
    // Make a DELETE request to the delete user endpoint
    this.userService.deleteUser();
  }

  

}
