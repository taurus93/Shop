import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Category} from '../category/Category';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];
  categories: Observable<Category[]>;
  images: any[];
  readonly ROOT_URL = 'http://localhost:8008/ShopeeRestService/dataService';

  ngOnInit() {
    this.items = [
      {label: 'Stats', icon: 'fa fa-fw fa-bar-chart'},
      {label: 'Calendar', icon: 'fa fa-fw fa-calendar'},
      {label: 'Documentation', icon: 'fa fa-fw fa-book'},
      {label: 'Support', icon: 'fa fa-fw fa-support'},
      {label: 'Social', icon: 'fa fa-fw fa-twitter'}
    ];
    this.categories = this.getAllCategory();
    this.images = [];
    this.images.push({source: 'src/assets/post1.jpg', alt: 'Description for Image 1', title: 'Title 1'});
    this.images.push({source: 'src/assets/post2.jpg', alt: 'Description for Image 2', title: 'Title 2'});
    this.images.push({source: 'src/assets/post3.jpg', alt: 'Description for Image 3', title: 'Title 3'});
  }

  constructor(private http: HttpClient) {
  }

  getAllCategory(): Observable<Category[]> {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    return this.http.get<Category[]>(this.ROOT_URL + '/getAllCategory', {headers});
    // return this.http.get(this.ROOT_URL + '/getAllCategory', { headers });
  }
}
