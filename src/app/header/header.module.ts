import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HeaderRoutingModule} from './header-routing.module';
import {HeaderComponent} from './header.component';
import {TabMenuModule} from 'primeng/tabmenu';
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "../app.component";

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HeaderRoutingModule,
    TabMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class HeaderModule {
}
