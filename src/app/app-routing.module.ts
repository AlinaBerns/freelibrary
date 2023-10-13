import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './user/home/home.component';
import { AccountComponent } from './user/account/account.component';
import { CartComponent } from './user/cart/cart.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'account', component:AccountComponent},
  {path: 'cart', component:CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
