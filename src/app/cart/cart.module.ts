import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CartComponent} from './cart.component';
import {FormsModule} from "@angular/forms";
import {FooterModule} from "../footer/footer.module";

@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    FooterModule
  ],
  exports: [CartComponent],
  providers: []
})
export class CartModule { }
