import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {User} from '../../model/User';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as $ from 'jquery';
import {Product} from '../../model/Product';

@Component({
  selector: 'app-product-mng',
  templateUrl: './product-mng.component.html',
  styleUrls: ['./product-mng.component.scss']
})
export class ProductMngComponent implements OnInit {

  form: FormGroup;
  formCreate: FormGroup;
  items: Observable<Product[]>;
  itemSelected: Product;
  itemTmp: Product;
  status: 0;
  readonly ROOT_URL = 'http://localhost:8007/ShopeeDao/';

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.items = this.getAll();
    this.form = this.formBuilder.group({
      productCode: ['', Validators.required],
      productName: ['', Validators.required],
      productPrice: ['', Validators.required],
      productPicture: ['', Validators.required],
      productDescription: ['', Validators.required],
      categoryID_FK: ['', Validators.required],
    });
    this.formCreate = this.formBuilder.group({
      productCode: ['', Validators.required],
      productName: ['', Validators.required],
      productPrice: ['', Validators.required],
      productPicture: ['', Validators.required],
      productDescription: ['', Validators.required],
      categoryID_FK: ['', Validators.required],
    });
    this.itemTmp = {
      productCode: '',
      productName: '',
      productPrice: 0,
      productPicture: '',
      productDescription: '',
      categoryID_FK: 0
    };
  }

  getAll(): Observable<Product[]> {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    return this.http.get<Product[]>(this.ROOT_URL + 'product/getAllProduct', {headers});
  }

  select(item) {
    this.itemSelected = item;
    this.form.setValue({
      productCode: item.productCode,
      productName: item.productName,
      productPrice: item.productPrice,
      productPicture: item.productPicture,
      productDescription: item.productDescription,
      categoryID_FK: item.categoryID_FK
    });
  }

  delete(item) {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    this.http.get<any[]>(this.ROOT_URL + 'product/deleteProduct?productCode=' + item.productCode, {headers}).subscribe(
      (data: any[]) => {
        this.items = this.getAll();
      }
    );
  }

  openCreateModal() {
    this.formCreate.setValue({
      productCode: '',
      productName: '',
      productPrice: 0,
      productPicture: '',
      productDescription: '',
      categoryID_FK: 0
    });
  }

  onSubmit() {

    // stop here if form is invalid

    this.itemSelected.productCode = this.form.value.productCode;
    this.itemSelected.productName = this.form.value.productName;
    this.itemSelected.productPrice = this.form.value.productPrice;
    this.itemSelected.productPicture = this.form.value.productPicture;
    this.itemSelected.productDescription = this.form.value.productDescription;
    this.itemSelected.categoryID_FK = this.form.value.categoryID_FK;

    this.http.post(this.ROOT_URL + 'product/updateProduct', this.itemSelected).subscribe(
      (data: any[]) => {
        this.items = this.getAll();
      });

    $('.close').click();
  }

  onSubmitCreate() {

    // stop here if form is invalid
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    this.itemTmp.productCode = this.formCreate.value.productCode;
    this.itemTmp.productName = this.formCreate.value.productName;
    this.itemTmp.productPrice = this.formCreate.value.productPrice;
    this.itemTmp.productPicture = this.formCreate.value.productPicture;
    this.itemTmp.productDescription = this.formCreate.value.productDescription;
    this.itemTmp.categoryID_FK = this.formCreate.value.categoryID_FK;

    // const result = this.http.post(this.ROOT_URL + 'user/insertUser', this.user, {headers});
    this.http.post(this.ROOT_URL + 'product/insertProduct', this.itemTmp).subscribe(
      (data: any[]) => {
        this.items = this.getAll();
      });

    $('.close').click();
  }

}
