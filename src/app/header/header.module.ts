import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HeaderRoutingModule} from './header-routing.module';
import {HeaderComponent} from './header.component';
import {TabMenuModule} from 'primeng/tabmenu';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from '../app.component';
import {GalleriaModule} from 'primeng/galleria';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HeaderRoutingModule,
    TabMenuModule,
    GalleriaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class HeaderModule {
}
