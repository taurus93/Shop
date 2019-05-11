import {Component, OnInit} from '@angular/core';
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

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    if (this.currentUser) {
      this.orders = this.getAllOrder();
      this.facture = {
        orderCode: '',
        userEmail: this.currentUser.userEmail,
        productName: '',
        quantity: 0,
        totalPrice: 0,
        status: 1
      };
    }
  }

  getAllOrder(): Observable<OrderProduct[]> {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    return this.http.get<OrderProduct[]>(this.ROOT_URL + 'orderProduct/getOrderProduct?userEmail=' + this.currentUser.userEmail, {headers});
  }

  createFacture(orderCode) {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    // const result = this.http.post(this.ROOT_URL + 'user/insertUser', this.user, {headers});
    this.orders.forEach(order => {
      console.log(order);
      for (const value of order) {
        this.facture.orderCode = value.orderCode;
        this.http.post(this.ROOT_URL + 'facture/insertFacture', this.facture).subscribe(
          (data: any[]) => {
            console.log(data);
          });
      }
    });
    this.orders = this.getAllOrder();

    // this.http.get<any[]>(this.ROOT_URL + 'orderDetail/deleteOrder?orderCode=' + orderCode, {headers}).subscribe(
    //   (data: any[]) => {
    //   }
    // );
  }
}
