import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './user/home/home.component';
import { ThemeService } from './theme.service';
import { NavbarComponent } from './user/navbar/navbar.component';
import { AccountComponent } from './user/account/account.component';
import { CartComponent } from './user/cart/cart.component';
import { NavbaraccountComponent } from './navbaraccount/navbaraccount.component';
import { NavbarcartComponent } from './navbarcart/navbarcart.component';


@NgModule({
  declarations: [AppComponent, HomeComponent, NavbarComponent, AccountComponent, CartComponent, NavbaraccountComponent, NavbarcartComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [ThemeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
