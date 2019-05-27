import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminModule} from '../admin.module';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from '../../app.component';
import {ProductMngComponent} from './product-mng.component';

@NgModule({
  declarations: [ProductMngComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AdminModule,
    ReactiveFormsModule,
    NgbModalModule
  ],
  bootstrap: [AppComponent],
  exports: [ProductMngComponent],
  providers: []
})
export class ProductMngModule { }
