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
import {UserModule} from './admin/user/user.module';
import {AdminModule} from './admin/admin.module';
import {ProductMngModule} from './admin/product-mng/product-mng.module';
import {PaymentMngModule} from './admin/payment-mng/payment-mng.module';
import {OrderMngModule} from './admin/order-mng/order-mng.module';
import {FactureMngModule} from './admin/facture-mng/facture-mng.module';
import {CategoryMngModule} from './admin/category-mng/category-mng.module';
import { FooterComponent } from './footer/footer.component';
import {FormsModule} from "@angular/forms";
import {FooterModule} from "./footer/footer.module";
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
    AdminModule,
    ProductMngModule,
    PaymentMngModule,
    OrderMngModule,
    FactureMngModule,
    CategoryMngModule,
    FooterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
