import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TabMenuModule} from 'primeng/tabmenu';
import {HeaderModule} from './header/header.module';
import {BodyModule} from './body/body.module';
import { HttpClientModule } from '@angular/common/http';
import {ProductModule} from './product/product.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TabMenuModule,
    HeaderModule,
    BodyModule,
    HttpClientModule,
    ProductModule,
    BodyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
