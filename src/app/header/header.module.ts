import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HeaderRoutingModule} from './header-routing.module';
import {HeaderComponent} from './header.component';
import {TabMenuModule} from 'primeng/tabmenu';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from '../app.component';
import {GalleriaModule} from 'primeng/galleria';
import {DataViewModule} from 'primeng/dataview';
import {CarouselModule} from 'primeng/carousel';
import {DialogModule} from 'primeng/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {BodyModule} from '../body/body.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HeaderRoutingModule,
    TabMenuModule,
    GalleriaModule,
    DataViewModule,
    CarouselModule,
    DialogModule,
    BrowserAnimationsModule,
    FormsModule,
    BodyModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule {
}
