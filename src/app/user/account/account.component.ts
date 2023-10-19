import { Component } from '@angular/core';
import { UserService } from 'src/app/services/userservice/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  reservedBooks: any[] = [
    {id: 1, 
      title: 'ATEST', 
      author:'Aauthor', 
      isbn:'9132345678954',
      dataOfReturn: '01-12-1913',
      status: 'RESERVED'
    },
    {id: 2, 
      title: 'BTESTffffffffffffffffffffffffffffffff', 
      author:'Bauthor', 
      isbn:'9132345678955',
      dataOfReturn: '02-12-1913',
      status: 'BORROWED'
    },
    {id: 3, 
      title: 'CTEST', 
      author:'Cauthor', 
      isbn:'9132345678956',
      dataOfReturn: '03-01-1915',
      status: 'RESERVED'
    },
    {id: 4, 
      title: 'DTEST', 
      author:'Dauthor', 
      isbn:'9132345678957',
      dataOfReturn: '13-02-1915',
      status: 'BORROWED'
    }
  ];

  sortDirection: string = 'asc';

  constructor(private userService:UserService) { }

  newUsername: string = '';
  newEmail: string = '';
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  disableOtherFields: boolean = false;
  activeField: string = '';

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
