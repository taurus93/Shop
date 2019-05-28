import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Product} from '../model/Product';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import * as $ from 'jquery';
import {OrderDetail} from '../model/OrderDetail';
import {formatDate} from '@angular/common';
import {Facture} from '../model/Facture';
import {AuthenticationService} from '../service/authentication.service';
import {User} from '../model/User';
import {OrderUser} from '../model/OrderUser';
import {OrderProduct} from '../model/OrderProduct';
import * as moment from 'moment';

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
  orderProduct: OrderProduct;
  productCode: string;
  today = new Date();
  jstoday = '';
  facture: Facture;
  currentUserSubscription: Subscription;
  currentUser: User;
  listTextDescription: string[];

  constructor(private http: HttpClient, private route: ActivatedRoute,
              private authenticationService: AuthenticationService, private router: Router) {
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
      this.orderProduct = {
        orderCode: '',
        productCode: this.productCode,
        factureCode: '',
        totalPrice: 0,
        orderDate: '',
        quantity: 0,
        userEmail: this.currentUser.userEmail,
        productPicture: '',
        productName: '',
        productDescription: '',
        status: 1,
        paymentCode: '1'
      };
      this.facture = {
        factureCode: '',
        userEmail: this.currentUser.userEmail,
        quantity: 0,
        totalPrice: 0,
        status: 1
      };
    } else {
      this.orderProduct = {
        orderCode: '',
        productCode: this.productCode,
        factureCode: '',
        totalPrice: 0,
        orderDate: '',
        quantity: 0,
        userEmail: '',
        productPicture: '',
        productName: '',
        productDescription: '',
        status: 1,
        paymentCode: '1'
      };
      this.facture = {
        factureCode: '',
        userEmail: '',
        quantity: 0,
        totalPrice: 0,
        status: 1
      };
    }
    this.getProduct();
  }

  getProduct() {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    this.http.get<any[]>(this.ROOT_URL + 'product/getProduct?productCode=' + this.productCode, {headers}).subscribe(
      (data: any[]) => {
        if (data.length) {
          this.product = data[0];
          this.listTextDescription = this.product.productDescription.split("+");
        }
      }
    );
  }

  insertOrderProduct() {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    // const result = this.http.post(this.ROOT_URL + 'user/insertUser', this.user, {headers});

    this.orderProduct.orderCode = new Date().getTime().toString();
    this.orderProduct.orderDate = moment().format('DD/MM/YYYY');

    if (this.currentUser) {
      if (this.orderProduct.quantity > 0) {
        this.http.post(this.ROOT_URL + 'orderProduct/insertOrderProduct', this.orderProduct).subscribe(
          (data: any[]) => {
            console.log(data);
            $('#order-success-alert').show();
          });
      }
    } else {
      // this.comp.openLoginModal();
      $('#login-alert').show();
    }
  }

  closeAlert() {
    $('.alert').hide();
  }

  insertOrderAndRedirectToFacture() {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    // const result = this.http.post(this.ROOT_URL + 'user/insertUser', this.user, {headers});

    this.orderProduct.orderCode = new Date().getTime().toString();
    this.orderProduct.orderDate = moment().format('DD/MM/YYYY');

    if (this.currentUser) {
      if (this.orderProduct.quantity > 0) {
        this.http.post(this.ROOT_URL + 'orderProduct/insertOrderProduct', this.orderProduct).subscribe(
          (data: any[]) => {
            console.log(data);
            $('#order-success-alert').show();
            this.router.navigate(['cart']);
          });
      }
    } else {
      // this.comp.openLoginModal();
      $('#login-alert').show();
    }
  }
}
