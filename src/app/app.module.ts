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
import { UsersComponent } from './admin/users/users.component';
import { BookDescriptionDialogComponent } from './description/book-description-dialog/book-description-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { BookDialogComponent } from './dialogs/book-dialog/book-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { NewAuthorDialogComponent } from './dialogs/newauthor-dialog/new-author-dialog/new-author-dialog.component';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { TabbedDialogComponent } from './dialogs/tabbed-dialog/tabbed-dialog.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from './dialogs/custom-snackbar/custom-snackbar.component';





@NgModule({
  declarations: [AppComponent, 
    HomeComponent, 
    NavbarComponent, 
    AccountComponent, 
    CartComponent, 
    NavbaraccountComponent, 
    NavbarcartComponent, 
    LoginComponent, 
    RegistrationComponent, 
    AdminhomeComponent, 
    NavbaradminComponent, 
    UsersComponent, 
    BookDescriptionDialogComponent, 
    BookDialogComponent, NewAuthorDialogComponent,  TabbedDialogComponent, CustomSnackbarComponent,
],

  imports: [BrowserModule, 
    AppRoutingModule,
  FormsModule,
  ReactiveFormsModule,
  BrowserAnimationsModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  ReactiveFormsModule,
  MatListModule,
  MatCheckboxModule,
  MatTabsModule,
  MatButtonModule,
  MatIconModule,
  MatTableModule,
  MatSortModule,
  MatSnackBarModule,
],
  providers: [ThemeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
