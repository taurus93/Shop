import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {ProductComponent} from './product/product.component';
import {HomeComponent} from './home/home.component';


@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forRoot([
      {path: 'header', component: HeaderComponent},
      {path: 'home', component: HomeComponent},
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
