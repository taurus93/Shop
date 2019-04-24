import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderModule} from '../header/header.module';
import {BodyModule} from '../body/body.module';
import {ProductModule} from '../product/product.module';
import {HomeComponent} from './home.component';
import {AppComponent} from '../app.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HeaderModule,
    BodyModule,
    ProductModule
  ],
  bootstrap: [AppComponent],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
