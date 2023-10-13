import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  scaleValue = 1;

  changeScale() {
   
    this.scaleValue = 1.2; 
  }
  changeScale2() {
   
    this.scaleValue = 1; 
  }

}
