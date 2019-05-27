import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CartComponent} from './cart.component';

@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule
  ],
  exports: [CartComponent],
  providers: []
})
export class CartModule { }
