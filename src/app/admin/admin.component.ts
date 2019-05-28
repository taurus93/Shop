import { Component, OnInit, Input } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Product} from '../model/Product';
import {MenuItem} from 'primeng/api';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../service/authentication.service';
import {FormBuilder} from '@angular/forms';
import {User} from '../model/User';
import {AppComponent} from "../app.component";
import * as $ from 'jquery';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  isShown = false;
  items: any[];
  @Input() name: string;
  currentUser: User;
  currentUserSubscription: Subscription;
  listProduct: Observable<Product[]>;
  readonly ROOT_URL = 'http://localhost:8007/ShopeeDao/';

  ngOnInit() {
    this.listProduct = this.getAllProduct();
    this.items = [
      {label: 'Người dùng', code: 'user', icon: 'fa fa-fw fa-bar-chart'},
      {label: 'Sản phẩm', code: 'product', icon: 'fa fa-fw fa-calendar'},
      {label: 'Phương thức thanh toán', code: 'payment', icon: 'fa fa-fw fa-book'},
      {label: 'Giỏ hàng', code: 'orderdetails', icon: 'fa fa-fw fa-support'},
      {label: 'Đơn hàng', code: 'facture', icon: 'fa fa-fw fa-support'},
      {label: 'Danh mục sản phẩm', code: 'category', icon: 'fa fa-fw fa-twitter'}
    ];
    try {
      this.authenticationService.update(this.currentUser.userEmail);
    } catch (e) {
      // No content response..
    }
  }

  constructor(private http: HttpClient, private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private appComponent: AppComponent) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  getAllProduct(): Observable<Product[]> {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    return this.http.get<Product[]>(this.ROOT_URL + 'product/getAllProduct', {headers});
  }



}
