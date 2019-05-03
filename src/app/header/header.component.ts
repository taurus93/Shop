import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Category} from '../model/Category';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Product} from '../model/Product';
import {User} from '../model/User';
import {AuthenticationService} from '../service/authentication.service';

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
      userEmail: '',
      password: '',
      profile: ''
    };
  }

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
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
    this.authenticationService.login(this.user.userEmail, this.user.password);
  }
  logout() {
    this.authenticationService.logout();
  }

  // login
}
