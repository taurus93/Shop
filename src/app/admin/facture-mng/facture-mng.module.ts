import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminModule} from '../admin.module';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {FactureMngComponent} from './facture-mng.component';
import {AppComponent} from '../../app.component';

@NgModule({
  declarations: [FactureMngComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AdminModule,
    ReactiveFormsModule,
    NgbModalModule
  ],
  bootstrap: [AppComponent],
  exports: [FactureMngComponent]
})
export class FactureMngModule { }
