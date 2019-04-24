import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductComponent} from './product.component';
import {AppComponent} from '../app.component';
import {ProductRoutingModule} from './product-routing.module';
import {HeaderModule} from '../header/header.module';
import {HeaderComponent} from '../header/header.component';
import {BodyModule} from '../body/body.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    HeaderModule,
    BodyModule,
    FormsModule
  ],
  bootstrap: [AppComponent]
})
export class ProductModule { }
