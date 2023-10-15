import { Component } from '@angular/core';
import { AuthService } from '../services/security/auth.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';


  constructor(private authService: AuthService) {}

  scaleValue = 1;

  changeScale() {
   
    this.scaleValue = 1.2; 
  }
  changeScale2() {
   
    this.scaleValue = 1; 
  }

  logIn() {
    this.authService.login(this.username, this.password);
  }
}
