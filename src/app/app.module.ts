import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TabMenuModule} from 'primeng/tabmenu';
import {HeaderModule} from './header/header.module';
import {BodyModule} from './body/body.module';
import { HttpClientModule } from '@angular/common/http';
import {ProductModule} from './product/product.module';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { FactureComponent } from './facture/facture.component';
import { AdminComponent } from './admin/admin.component';
import {UserComponent} from './admin/user/user.component';
import {UserModule} from './admin/user/user.module';
import {AdminModule} from './admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    FactureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TabMenuModule,
    HeaderModule,
    BodyModule,
    HttpClientModule,
    ProductModule,
    UserModule,
    AdminModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
