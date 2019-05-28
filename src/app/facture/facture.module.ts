import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FactureComponent} from './facture.component';
import {FormsModule} from "@angular/forms";
import {FooterModule} from "../footer/footer.module";

@NgModule({
  declarations: [FactureComponent],
  imports: [
    CommonModule,
    FooterModule
  ],
  exports: [FactureComponent]
})
export class FactureModule { }
