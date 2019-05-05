import { Component, OnInit, Input } from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../model/Product';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  isShown = false;
  items: MenuItem[];
  @Input() name: string;
  constructor() { }

  ngOnInit() {
    this.items = [
      {label: 'user', icon: 'fa fa-fw fa-bar-chart'},
      {label: 'product', icon: 'fa fa-fw fa-calendar'},
      {label: 'payment', icon: 'fa fa-fw fa-book'},
      {label: 'orders', icon: 'fa fa-fw fa-support'},
      {label: 'orderdetails', icon: 'fa fa-fw fa-support'},
      {label: 'facture', icon: 'fa fa-fw fa-support'},
      {label: 'category', icon: 'fa fa-fw fa-twitter'}
    ];
  }
}
