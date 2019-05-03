import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminComponent} from "./admin.component";
import {AppComponent} from "../app.component";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  bootstrap: [AppComponent],
  exports: [AdminComponent]
})
export class AdminModule { }
