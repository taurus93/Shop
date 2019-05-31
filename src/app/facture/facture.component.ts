import {Component, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {OrderProduct} from '../model/OrderProduct';
import {User} from '../model/User';
import {Facture} from '../model/Facture';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../service/authentication.service';
import {Router} from '@angular/router';

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
  objectListFactureByStatus = {
    waitForPay: [],
    waitForReceive: [],
    delivery: [],
    delivered: [],
    cancel: []
  };

  constructor(private http: HttpClient, private authenticationService: AuthenticationService, private router: Router) {
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
        quantity: 0,
        totalPrice: 0,
        status: '',
        receiverCode: ''
      };
    }
  }

  getAllFacture(): Observable<Facture[]> {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    this.objectListFactureByStatus = {
      waitForPay: [],
      waitForReceive: [],
      delivery: [],
      delivered: [],
      cancel: []
    };

    const listFacture = this.http.get<Facture[]>(this.ROOT_URL + 'facture/getFactureByUserEmail?userEmail='
      + this.currentUser.userEmail, {headers});
    listFacture.forEach(facture => {
      for (var i = 0; i < facture.length; i++) {
        switch (facture[i].status) {
          case 'waitForPay':
            this.objectListFactureByStatus['waitForPay'].push(facture[i]);
            break;
          case 'waitForReceive':
            this.objectListFactureByStatus['waitForReceive'].push(facture[i]);
            break;
          case 'delivery':
            this.objectListFactureByStatus['delivery'].push(facture[i]);
            break;
          case 'delivered':
            this.objectListFactureByStatus['delivered'].push(facture[i]);
            break;
          case 'cancel':
            this.objectListFactureByStatus['cancel'].push(facture[i]);
            break;
        }
      }
    });
    return listFacture;
  }

  redirectToPayment(post) {
    this.router.navigateByUrl('/payment/' + post.factureCode);
  }

  cancelFacture(post) {
    const facture = post;
    facture.status = 'cancel';
    this.http.post(this.ROOT_URL + 'facture/updateFacture', facture).subscribe(
      (data: any[]) => {
        console.log(data);
        this.factures = this.getAllFacture();
      });
  }
  activeFacture(post) {
    const facture = post;
    facture.status = 'waitForPay';
    this.http.post(this.ROOT_URL + 'facture/updateFacture', facture).subscribe(
      (data: any[]) => {
        console.log(data);
        this.factures = this.getAllFacture();
      });
  }


  // this.http.get<any[]>(this.ROOT_URL + 'orderDetail/deleteOrder?orderCode=' + orderCode, {headers}).subscribe(
  //   (data: any[]) => {
  //   }
  // );
}
