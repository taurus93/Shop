import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BodyRoutingModule } from './body-routing.module';
import { BodyComponent } from './body.component';
import {BrowserModule} from '@angular/platform-browser';
import {HeaderRoutingModule} from '../header/header-routing.module';
import {CarouselModule, DialogModule, GalleriaModule, TabMenuModule} from 'primeng/primeng';
import {DataViewModule} from 'primeng/dataview';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HeaderComponent} from '../header/header.component';
import {AppComponent} from '../app.component';

@NgModule({
  declarations: [BodyComponent],
  imports: [
    CommonModule,
    BodyRoutingModule,
    BrowserModule,
    TabMenuModule,
    GalleriaModule,
    DataViewModule,
    CarouselModule,
    DialogModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  bootstrap: [AppComponent],
  exports: [
    BodyComponent
  ]
})
export class BodyModule { }
