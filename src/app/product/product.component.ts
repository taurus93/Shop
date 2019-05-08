import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Product} from '../model/Product';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import * as $ from 'jquery';
import {OrderDetail} from '../model/OrderDetail';
import {formatDate } from '@angular/common';
import {Facture} from '../model/Facture';
import {AuthenticationService} from '../service/authentication.service';
import {User} from '../model/User';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  readonly ROOT_URL = 'http://localhost:8007/ShopeeDao/';
  products: Observable<Product[]>;
  product: Product;
  order: OrderDetail;
  productCode: string;
  today = new Date();
  jstoday = '';
  facture: Facture;
  currentUserSubscription: Subscription;
  currentUser: User;

  constructor(private http: HttpClient, private route: ActivatedRoute, private authenticationService: AuthenticationService) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    // this.product = this.getProduct();
    this.route.paramMap.subscribe(params => {
      console.log(params.get('productCode'));
      this.productCode = params.get('productCode');
    });
    this.jstoday = formatDate(this.today, 'yyyy-MM-dd', 'en-US', '+0530');
    if (this.currentUser) {
      this.order = {
        orderDetailCode: this.today.getTime().toString(),
        orderDate: this.jstoday,
        quantity: 0,
        totalPrice: 0,
        productID_FK: 9,
        productPicture: 'iphone6.jpg',
        productName: 'iphone 6',
        productDescription: 'test',
        userEmail_FK: this.currentUser.userEmail,
        paymentID_FK: 1
      };
    } else {
      this.order = {
        orderDetailCode: this.today.getTime().toString(),
        orderDate: this.jstoday,
        quantity: 0,
        totalPrice: 0,
        productID_FK: 9,
        productPicture: 'iphone6.jpg',
        productName: 'iphone 6',
        productDescription: 'test',
        userEmail_FK: '',
        paymentID_FK: 1
      };
    }
    this.facture = {
      orderCode: ''
    }
    this.getProduct();
  }

  getProduct() {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    this.http.get<any[]>(this.ROOT_URL + 'product/getProduct?productCode=' + this.productCode, {headers}).subscribe(
      (data: any[]) => {
        if (data.length) {
          this.product = data[0];
        }
      }
    );
  }

  insertProduct() {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    // const result = this.http.post(this.ROOT_URL + 'user/insertUser', this.user, {headers});
    if (this.order.quantity > 0) {
      this.http.post(this.ROOT_URL + 'orderDetail/insertOrder', this.order).subscribe(
        (data: any[]) => {
          console.log(data);
        });
    }
  }

  createFacture() {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    // const result = this.http.post(this.ROOT_URL + 'user/insertUser', this.user, {headers});
    this.facture.orderCode = this.order.orderDetailCode;
    this.http.post(this.ROOT_URL + 'facture/insertFacture', this.facture).subscribe(
      (data: any[]) => {
        console.log(data);
      });

    this.http.get<any[]>(this.ROOT_URL + 'orderDetail/deleteOrder?orderCode=' + this.order.orderDetailCode, {headers}).subscribe(
      (data: any[]) => {
      }
    );
  }
}
