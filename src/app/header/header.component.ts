import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Category} from '../model/Category';
import {Observable} from 'rxjs';
import {Product} from "../model/Product";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];
  categories: Observable<Category[]>;
  products: Observable<Product[]>;
  images: any[];
  readonly ROOT_URL = 'http://localhost:8007/ShopeeDao/';

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
  }

  constructor(private http: HttpClient) {
  }

  //show dialog
  display: boolean = false;

  showDialog() {
    this.display = true;
  }

  //get data
  getAllCategory(): Observable<Category[]> {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    return this.http.get<Category[]>(this.ROOT_URL + 'category/getAllCategory', {headers});
  }

  getAllProduct(): Observable<Product[]> {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    return this.http.get<Product[]>(this.ROOT_URL + 'product/getAllProduct', {headers});
  }
}
