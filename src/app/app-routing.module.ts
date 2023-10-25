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
import { AboutusComponent } from './extra/aboutus/aboutus.component';
import { Aboutus2Component } from './extra/aboutus2/aboutus2.component';
import { Aboutus3Component } from './extra/aboutus3/aboutus3.component';
import { ProjectdetailsComponent } from './extra/projectdetails/projectdetails.component';
import { ThankstoComponent } from './extra/thanksto/thanksto.component';
import { AboutusNavbarComponent } from './extra/aboutus-navbar/aboutus-navbar.component';

const routes: Routes = [
  {path: '', component:HomeComponent, canActivate: [authGuard], data: { allowedRoles: ['ROLE_USER'] } },
  {path: 'account', component:AccountComponent, canActivate: [authGuard], data: { allowedRoles: ['ROLE_USER'] }},
  {path: 'cart', component:CartComponent,  canActivate: [authGuard], data: { allowedRoles: ['ROLE_USER'] }}, 
  {path:'login', component:LoginComponent, canActivate: [authGuard]},
  {path:'registration', component:RegistrationComponent, canActivate: [authGuard]},
  {path:'adminhome', component:AdminhomeComponent, canActivate: [authGuard], data: { allowedRoles: ['ROLE_ADMIN'] }},
  {path:'adminusers', component:UsersComponent, canActivate: [authGuard], data: { allowedRoles: ['ROLE_ADMIN'] } },
  { path: 'aboutus', component: AboutusComponent},
  { path: 'aboutus2', component: Aboutus2Component},
  { path: 'aboutus3', component: Aboutus3Component},
  { path: 'projectdetails', component: ProjectdetailsComponent},
  { path: 'thanksto', component: ThankstoComponent},
  { path: 'aboutus-navbar', component: AboutusNavbarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
