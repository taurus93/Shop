import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductComponent} from './product.component';
import {AppComponent} from '../app.component';
import {ProductRoutingModule} from './product-routing.module';
import {HeaderModule} from '../header/header.module';
import {HeaderComponent} from '../header/header.component';
import {BodyModule} from '../body/body.module';

@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    HeaderModule,
    BodyModule
  ],
  bootstrap: [AppComponent]
})
export class ProductModule { }
