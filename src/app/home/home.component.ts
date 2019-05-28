import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(private appComponent: AppComponent) { }

  ngOnInit() {
    // this.appComponent.ngOnInit();
  }

}
