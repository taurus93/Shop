import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Router} from "@angular/router";
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'my-app';
  public href: string = "";
  public isAdminComp: boolean = false;
  items: MenuItem[];
  constructor(private router: Router) {}
  ngOnInit() {
    this.href = window.location.href;
    if(this.href.includes('admin')) {
      this.isAdminComp = true;
    }else {
      this.isAdminComp = false;
    }
  }
}
