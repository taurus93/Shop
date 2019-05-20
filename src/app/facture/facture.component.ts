import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {OrderProduct} from '../model/OrderProduct';
import {User} from '../model/User';
import {Facture} from '../model/Facture';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../service/authentication.service';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent implements OnInit {

  readonly ROOT_URL = 'http://localhost:8007/ShopeeDao/';
  factures: Observable<Facture[]>;
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
      this.factures = this.getAllFacture();
      this.facture = {
        factureCode: '',
        userEmail: this.currentUser.userEmail,
        productName: '',
        quantity: 0,
        totalPrice: 0,
        status: 1
      };
    }
  }

  getAllFacture(): Observable<Facture[]> {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    return this.http.get<Facture[]>(this.ROOT_URL + 'facture/getFactureByUserEmail?userEmail=' + this.currentUser.userEmail, {headers});
  }


    // this.http.get<any[]>(this.ROOT_URL + 'orderDetail/deleteOrder?orderCode=' + orderCode, {headers}).subscribe(
    //   (data: any[]) => {
    //   }
    // );
}
