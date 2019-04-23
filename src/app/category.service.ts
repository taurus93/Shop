import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import {Observable} from 'rxjs';
import {Category} from './model/Category';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // categoryUrl = 'http://localhost:8008/ShopeeRestService/dataService/getAllCategory';
  readonly ROOT_URL = 'http://localhost:8008/ShopeeRestService/dataService';

  posts: Observable<any>;
  newPost: Observable<any>;

  constructor(private http: HttpClient) {}

  getCategory() {
    const headers = new HttpHeaders().set('Authorization', 'auth-token');

    this.posts = this.http.get(this.ROOT_URL + '/getAllCategory', { headers });
    // return this.http.get(this.ROOT_URL + '/getAllCategory', { headers });
  }


  createPost() {
    // const data: Post = {
    //   id: null,
    //   userId: 23,
    //   title: 'My New Post',
    //   body: 'Hello World!'
    // }

    // this.newPost = this.http.post(this.ROOT_URL + '/posts', data)
    // .retry(3)
    // .catch(err => {
    //   console.log(err)
    //   return Observable.of(err)
    // })


  }
}
