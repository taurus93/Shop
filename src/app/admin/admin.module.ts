import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminComponent} from './admin.component';
import {AppComponent} from '../app.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { OrderMngComponent } from './order-mng/order-mng.component';
import { FactureMngComponent } from './facture-mng/facture-mng.component';
import { CategoryMngComponent } from './category-mng/category-mng.component';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule
  ],
  bootstrap: [AppComponent],
  exports: [AdminComponent]
})
export class AdminModule { }
