import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Product} from '../model/Product';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Order} from '../model/Order';
import {User} from '../model/User';
import {AuthenticationService} from '../service/authentication.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  readonly ROOT_URL = 'http://localhost:8007/ShopeeDao/';
  orders: Observable<Order[]>;
  currentUser: User;
  currentUserSubscription: Subscription;

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.orders = this.getAllOrder();
  }

  getAllOrder(): Observable<Order[]> {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    return this.http.get<Order[]>(this.ROOT_URL + 'order/getAllOrderByUser?userEmail=' + this.currentUser.userEmail, {headers});
  }

}
