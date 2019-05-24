import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminModule} from '../admin.module';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {OrderMngComponent} from './order-mng.component';
import {AppComponent} from '../../app.component';
import {AdminComponent} from "../admin.component";

@NgModule({
  declarations: [OrderMngComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AdminModule,
    ReactiveFormsModule,
    NgbModalModule
  ],
  bootstrap: [AppComponent],
  exports: [OrderMngComponent],
  providers: [AdminComponent]
})
export class OrderMngModule { }
