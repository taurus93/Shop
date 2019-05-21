import {Component, OnInit, Pipe} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Product} from '../model/Product';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {OrderDetail} from '../model/OrderDetail';
import {User} from '../model/User';
import {AuthenticationService} from '../service/authentication.service';
import {OrderProduct} from '../model/OrderProduct';
import {Facture} from '../model/Facture';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  readonly ROOT_URL = 'http://localhost:8007/ShopeeDao/';
  orders: Observable<OrderProduct[]>;
  currentUser: User;
  currentUserSubscription: Subscription;
  facture: Facture;
  showPayAllBtn: boolean;
  totalPriceAll: number = 0.00;
  numberOfProduct: number = 0.00;
  public orderList: OrderProduct[] = [];

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    if (this.currentUser) {
      this.facture = {
        factureCode: '',
        userEmail: this.currentUser.userEmail,
        quantity: this.numberOfProduct,
        totalPrice: this.totalPriceAll,
        status: 1
      };
      this.orders = this.getAllOrder();
      this.orders.forEach(order => {
        if (order.length === 0) {
          this.showPayAllBtn = false;
        } else {
          this.showPayAllBtn = true;
        }
        for(var i=0; i<order.length; i++) {
          if(order[i].status == 1) {
            this.totalPriceAll += order[i].totalPrice;
            this.numberOfProduct++;
            this.facture.totalPrice += order[i].totalPrice;
            this.facture.quantity++;
            this.orderList.push(order[i]);
          }
        }
      });
    }
  }

  getAllOrder(): Observable<OrderProduct[]> {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    return this.http.get<OrderProduct[]>(this.ROOT_URL + 'orderProduct/getOrderProduct?userEmail=' + this.currentUser.userEmail, {headers});
  }

  // createFacture(orderCode) {
  //   const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
  //   // const result = this.http.post(this.ROOT_URL + 'user/insertUser', this.user, {headers});
  //   this.orders.forEach(order => {
  //     console.log(order);
  //     this.facture.factureCode = orderCode+this.currentUser.userEmail;
  //     this.http.post(this.ROOT_URL + 'facture/insertFacture', this.facture).subscribe(
  //       (data: any[]) => {
  //         console.log(data);
  //         this.orders = this.getAllOrder();
  //       });
  //   });
  // }

  createFactureAll() {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    // this.orders.forEach(order => {
    //   console.log(order);
    //   for (const value of order) {
    //     this.facture.factureCode = new Date().getTime().toString();
    //     const obj = {
    //       "facture": this.facture,
    //       "orderList": this.orderList
    //     };
    //     this.http.post(this.ROOT_URL + 'facture/insertFacture', JSON.stringify(obj)).subscribe(
    //       (data: any[]) => {
    //         console.log(data);
    //       });
    //   }
    // });
    this.facture.factureCode = new Date().getTime().toString();
    const obj = {
      "facture": this.facture,
      "orderList": this.orderList
    };
    this.http.post(this.ROOT_URL + 'facture/insertFacture', JSON.stringify(obj)).subscribe(
      (data: any[]) => {
        console.log(data);
      });
    this.orders = this.getAllOrder();
  }

  delete(item) {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    this.http.get<any[]>(this.ROOT_URL + 'orderProduct/deleteOrderProduct?orderProductCode=' + item.orderCode, {headers}).subscribe(
      (data: any[]) => {
        this.orders = this.getAllOrder();
      }
    );

    this.orders.forEach(order => {
      if (order.length === 0) {
        this.showPayAllBtn = false;
      } else {
        this.showPayAllBtn = true;
      }
    });
  }}
