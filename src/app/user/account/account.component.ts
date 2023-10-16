import { Component } from '@angular/core';
import { UserService } from 'src/app/services/userservice/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  constructor(private userService:UserService) { }

  newUsername: string = '';
  newEmail: string = '';
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  disableOtherFields: boolean = false;
  activeField: string = '';

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
