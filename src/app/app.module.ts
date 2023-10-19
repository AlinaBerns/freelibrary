import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './user/home/home.component';
import { ThemeService } from './theme.service';
import { NavbarComponent } from './user/navbar/navbar.component';
import { AccountComponent } from './user/account/account.component';
import { CartComponent } from './user/cart/cart.component';
import { NavbaraccountComponent } from './navbaraccount/navbaraccount.component';
import { NavbarcartComponent } from './navbarcart/navbarcart.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AdminhomeComponent } from './admin/adminhome/adminhome.component';
import { NavbaradminComponent } from './admin/navbaradmin/navbaradmin.component';


@NgModule({
  declarations: [AppComponent, 
    HomeComponent, 
    NavbarComponent, 
    AccountComponent, 
    CartComponent, 
    NavbaraccountComponent, 
    NavbarcartComponent, 
    LoginComponent, 
    RegistrationComponent, AdminhomeComponent, NavbaradminComponent],
  imports: [BrowserModule, 
    AppRoutingModule,
  FormsModule,
  ReactiveFormsModule],
  providers: [ThemeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
