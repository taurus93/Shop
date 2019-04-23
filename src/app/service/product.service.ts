import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Product} from "../model/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}
  readonly ROOT_URL = 'http://localhost:8007/ShopeeDao/';
  getCarsLarge() {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    return this.http.get<Product[]>(this.ROOT_URL + 'product/getAllProduct', {headers})
      .toPromise()
      .then(res => <Product[]> res)
      .then(data => { return data; });
  }
}
