import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {ProductComponent} from './product/product.component';
import {HomeComponent} from './home/home.component';
import {CartComponent} from './cart/cart.component';
import {FactureComponent} from './facture/facture.component';
import {AdminComponent} from './admin/admin.component';
import {UserComponent} from './admin/user/user.component';


@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forRoot([
      {path: 'header', component: HeaderComponent},
      {path: 'home', component: HomeComponent},
      {path: 'cart', component: CartComponent},
      {path: 'facture', component: FactureComponent},
      {path: 'admin', component: AdminComponent},
      {path: 'admin/user', component: UserComponent},
      {
        path: 'product/:productCode',
        component: ProductComponent
      },
      {path: '**', redirectTo: 'home'}
    ])
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {
}
