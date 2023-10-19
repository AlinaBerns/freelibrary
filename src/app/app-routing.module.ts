import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './user/home/home.component';
import { AccountComponent } from './user/account/account.component';
import { CartComponent } from './user/cart/cart.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { authGuard } from './services/security/auth.guard';
import { AdminhomeComponent } from './admin/adminhome/adminhome.component';
import { UsersComponent } from './admin/users/users.component';

const routes: Routes = [
  {path: '', component:HomeComponent, canActivate: [authGuard], data: { allowedRoles: ['ROLE_USER'] } },
  {path: 'account', component:AccountComponent,  canActivate: [authGuard], data: { allowedRoles: ['ROLE_USER'] }},
  {path: 'cart', component:CartComponent,  canActivate: [authGuard], data: { allowedRoles: ['ROLE_USER'] }}, 
  {path:'login', component:LoginComponent, canActivate: [authGuard]},
  {path:'registration', component:RegistrationComponent, canActivate: [authGuard]},
  {path:'adminhome', component:AdminhomeComponent},
  {path:'adminusers', component:UsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
