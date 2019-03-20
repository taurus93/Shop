import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    // HeaderComponent
  ],
  imports: [
    RouterModule.forRoot([
      // {path: 'header', component: HeaderComponent},
      // {path: '**', redirectTo: 'header'}
    ])
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule { }
