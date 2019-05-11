import { Component, OnInit, Input } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Product} from '../model/Product';
import {MenuItem} from 'primeng/api';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../service/authentication.service';
import {FormBuilder} from '@angular/forms';
import {User} from '../model/User';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  isShown = false;
  items: MenuItem[];
  @Input() name: string;
  currentUser: User;
  currentUserSubscription: Subscription;

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

    try {
      this.authenticationService.update(this.currentUser.userEmail);
    } catch (e) {
      // No content response..
    }
  }

  constructor(private http: HttpClient, private authenticationService: AuthenticationService, private formBuilder: FormBuilder) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }
}
