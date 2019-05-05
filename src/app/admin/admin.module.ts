import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminComponent} from './admin.component';
import {AppComponent} from '../app.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { UserComponent } from './user/user.component';
import {RouterModule} from '@angular/router';

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
