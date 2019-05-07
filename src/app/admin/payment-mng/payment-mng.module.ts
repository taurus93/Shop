import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaymentMngComponent} from './payment-mng.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminModule} from '../admin.module';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from '../../app.component';
import {ProductMngComponent} from '../product-mng/product-mng.component';

@NgModule({
  declarations: [PaymentMngComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AdminModule,
    ReactiveFormsModule,
    NgbModalModule
  ],
  bootstrap: [AppComponent],
  exports: [PaymentMngComponent]
})
export class PaymentMngModule { }
