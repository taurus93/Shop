import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Category} from '../model/Category';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Product} from '../model/Product';
import {User} from '../model/User';
import {AuthenticationService} from '../service/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from '../_helpers/must-match.validator';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
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
  currentUser: User;
  currentUserSubscription: Subscription;
  private currentUserSubject: BehaviorSubject<User>;
  form: FormGroup;
  submitted = false;

  ngOnInit() {
    this.form = this.formBuilder.group({
      userName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      profile: ['', Validators.required],
      street: ['', Validators.required],
      suburb: ['', Validators.required],
      city: ['', Validators.required],
      postcode: ['', Validators.required],
    });
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
    this.user = this.userTmp = {
      userName: '',
      userEmail: '',
      password: '',
      profile: '',
      street: '',
      suburb: '',
      city: '',
      postcode: ''
    };
    try {
      this.authenticationService.update(this.currentUser.userEmail);
    } catch (e) {
      // No content response..
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  constructor(private http: HttpClient, private authenticationService: AuthenticationService, private formBuilder: FormBuilder) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  getAllCategory(): Observable<Category[]> {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    return this.http.get<Category[]>(this.ROOT_URL + 'category/getAllCategory', {headers});
  }

  getAllProduct(): Observable<Product[]> {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    return this.http.get<Product[]>(this.ROOT_URL + 'product/getAllProduct', {headers});
  }

  getProductByCategory(id) {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    this.http.get<Observable<Product[]>>(this.ROOT_URL + 'product/getProductByCategory?categoryCode=' + id,
      {headers}).subscribe(
      (data: Observable<Product[]>) => {
        this.products = data;
      }
    );
  }


  // login
  showDialog() {
    this.display = true;
  }

  openLoginModal() {
    $('#modalLoginForm').modal('open');
  }

  createUser(): void {
    console.log(this.user);
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    // const result = this.http.post(this.ROOT_URL + 'user/insertUser', this.user, {headers});

    this.userTmp.userName = this.form.value.userName;
    this.userTmp.userEmail = this.form.value.userEmail;
    this.userTmp.password = this.form.value.password;
    this.userTmp.profile = this.form.value.profile;
    this.userTmp.street = this.form.value.street;
    this.userTmp.suburb = this.form.value.suburb;
    this.userTmp.city = this.form.value.city;
    this.userTmp.postcode = this.form.value.postcode;

    if (this.userTmp.profile === 'Người dùng') {
      this.userTmp.profile = 'user';
    } else if (this.userTmp.profile === 'Người bán') {
      this.userTmp.profile = 'seller';
    }
    this.http.post(this.ROOT_URL + 'user/insertUser', this.userTmp).subscribe(
      (data: any[]) => {
        console.log(data);
      });
    $('.close').click();
  }

  login() {
    this.authenticationService.login(this.user.userEmail, this.user.password);
  }

  logout() {
    this.authenticationService.logout();
  }

  resetPass() {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    // this.http.get<number>(this.ROOT_URL + 'user/resetPass?userEmail=' + this.user.userEmail, {headers});
    this.http.get<any[]>(this.ROOT_URL + 'user/resetPass?userEmail=' + this.user.userEmail, {headers}).subscribe(
      (data: any[]) => {
      }
    );
  }

  // login
}
