import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppComponent} from '../../app.component';
import {AdminComponent} from '../admin.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserComponent} from './user.component';
import {AdminModule} from '../admin.module';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AdminModule,
    ReactiveFormsModule,
    NgbModalModule
  ],
  bootstrap: [AppComponent],
  exports: [UserComponent]
})
export class UserModule { }
