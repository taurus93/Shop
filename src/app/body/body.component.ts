import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Observable} from 'rxjs';
import {Category} from '../model/Category';
import {Product} from '../model/Product';
import {User} from '../model/User';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  items: MenuItem[];
  categories: Observable<Category[]>;
  products: Observable<Product[]>;
  users: Observable<User[]>;
  images: any[];
  readonly ROOT_URL = 'http://localhost:8007/ShopeeDao/';
  display = false;
  user: User;
  userTmp: User;
  doLogin: boolean;

  ngOnInit() {
    this.items = [
      {label: 'Stats', icon: 'fa fa-fw fa-bar-chart'},
      {label: 'Calendar', icon: 'fa fa-fw fa-calendar'},
      {label: 'Documentation', icon: 'fa fa-fw fa-book'},
      {label: 'Support', icon: 'fa fa-fw fa-support'},
      {label: 'Social', icon: 'fa fa-fw fa-twitter'}
    ];
    this.categories = this.getAllCategory();
    this.products = this.getAllProduct();
    this.images = [];
    this.images.push({source: '../assets/post1.jpg', alt: '', title: ''});
    this.images.push({source: '../assets/post2.jpg', alt: '', title: ''});
    this.images.push({source: '../assets/post3.jpg', alt: '', title: ''});
    this.user = {
      userName: '',
      phoneNumber: '',
      userEmail: '',
      password: '',
      profile: '',
      street: '',
      county: '',
      city: '',
      postcode: '',
      wards: ''
    };
  }

  constructor(private http: HttpClient) {}

  getAllCategory(): Observable<Category[]> {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    return this.http.get<Category[]>(this.ROOT_URL + 'category/getAllCategory', {headers});
  }

  getAllProduct(): Observable<Product[]> {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    return this.http.get<Product[]>(this.ROOT_URL + 'product/getAllProduct', {headers});
  }


  // login
  showDialog() {
    this.display = true;
  }

  createUser(): void {
    console.log(this.user);
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    // const result = this.http.post(this.ROOT_URL + 'user/insertUser', this.user, {headers});
    this.http.post(this.ROOT_URL + 'user/insertUser', this.user).subscribe(
      (data: any[]) => {
        console.log(data);
      });
  }

  login() {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    this.http.get<any[]>(this.ROOT_URL + 'user/getUserByUserEmail?userEmail=' + this.user.userEmail, {headers}).subscribe(
      (data: any[]) => {
        if (data.length) {
          this.userTmp = data[0];
          this.doLogin = true;
        } else {
          this.doLogin = false;
        }
      }
    );
  }

  // login

  // product
  selectProduct() {

  }
  // product
}
