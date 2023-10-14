import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './user/home/home.component';
import { AccountComponent } from './user/account/account.component';
import { CartComponent } from './user/cart/cart.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'account', component:AccountComponent},
  {path: 'cart', component:CartComponent},
  {path:'login', component:LoginComponent},
  {path:'registration', component:RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
