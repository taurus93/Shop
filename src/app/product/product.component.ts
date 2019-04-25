import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../model/Product';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import * as $ from 'jquery';
import {Order} from '../model/Order';
import {formatDate } from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  readonly ROOT_URL = 'http://localhost:8007/ShopeeDao/';
  products: Observable<Product[]>;
  product: Product;
  order: Order;
  productCode: string;
  today = new Date();
  jstoday = '';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    // this.product = this.getProduct();
    this.route.paramMap.subscribe(params => {
      console.log(params.get('productCode'));
      this.productCode = params.get('productCode');
    });
    this.jstoday = formatDate(this.today, 'yyyy-MM-dd', 'en-US', '+0530');
    this.order = {
      orderDate: this.jstoday,
      quantity: 0,
      totalPrice: 0,
      productID_FK: 9,
      productPicture: 'iphone6.jpg',
      productName: 'iphone 6',
      productDescription: 'test',
      userEmail_FK: 'lethanhtunglc@gmail.com',
      paymentID_FK: 1
    };
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
    this.http.post(this.ROOT_URL + 'order/insertOrder', this.order).subscribe(
      (data: any[]) => {
        console.log(data);
      });
  }
}
