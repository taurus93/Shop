import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FactureComponent} from './facture.component';

@NgModule({
  declarations: [FactureComponent],
  imports: [
    CommonModule
  ],
  exports: [FactureComponent]
})
export class FactureModule { }
