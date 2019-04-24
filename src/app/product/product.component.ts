import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../model/Product';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  readonly ROOT_URL = 'http://localhost:8007/ShopeeDao/';
  products: Observable<Product[]>;
  product: Product;
  productCode: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    // this.product = this.getProduct();
    this.route.paramMap.subscribe(params => {
      console.log(params.get('productCode'));
      this.productCode = params.get('productCode');
    });
    this.getProduct();
  }

  getProduct() {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    this.http.get<any[]>(this.ROOT_URL + 'product/getProduct?productCode=' + this.productCode, {headers}).subscribe(
      (data: any[]) => {
        if (data.length) {
          this.product = data[0];
        }
      }
    );
  }
}
