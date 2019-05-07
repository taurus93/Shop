import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminModule} from '../admin.module';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {CategoryMngComponent} from './category-mng.component';
import {AppComponent} from '../../app.component';
import {FactureMngComponent} from '../facture-mng/facture-mng.component';

@NgModule({
  declarations: [CategoryMngComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AdminModule,
    ReactiveFormsModule,
    NgbModalModule
  ],
  bootstrap: [AppComponent],
  exports: [CategoryMngComponent]
})
export class CategoryMngModule { }
