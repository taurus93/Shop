import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Payment} from '../../model/Payment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as $ from 'jquery';
import {OrderProduct} from '../../model/OrderProduct';
import {ProductMngComponent} from "../product-mng/product-mng.component";
import {Product} from "../../model/Product";
import {AdminComponent} from "../admin.component";
import {User} from "../../model/User";

@Component({
  selector: 'app-order-mng',
  templateUrl: './order-mng.component.html',
  styleUrls: ['./order-mng.component.scss']
})
export class OrderMngComponent implements OnInit {

  form: FormGroup;
  formCreate: FormGroup;
  items: Observable<OrderProduct[]>;
  listProduct: Observable<Product[]>;
  itemSelected: OrderProduct;
  itemTmp: OrderProduct;
  listPayment: Observable<Payment[]>;
  listUser: Observable<User[]>;
  status: 0;
  submitted: boolean;
  readonly ROOT_URL = 'http://localhost:8007/ShopeeDao/';

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.items = this.getAll();
    this.listProduct = this.getAllProduct();
    this.listPayment = this.getAllPayment();
    this.listUser = this.getAllUser();
    this.form = this.formBuilder.group({
      orderCode: ['', Validators.required],
      productCode: ['', Validators.required],
      factureCode: ['', Validators.required],
      totalPrice: ['', Validators.required],
      orderDate: ['', Validators.required],
      quantity: ['', Validators.required],
      userEmail: ['', Validators.required],
      productPicture: ['', Validators.required],
      productName: ['', Validators.required],
      productDescription: ['', Validators.required],
      status: ['', Validators.required],
      paymentCode: ['', Validators.required]
    });
    this.formCreate = this.formBuilder.group({
      orderCode: ['', Validators.required],
      productCode: ['', Validators.required],
      factureCode: ['', Validators.required],
      totalPrice: ['', Validators.required],
      orderDate: ['', Validators.required],
      quantity: ['', Validators.required],
      userEmail: ['', Validators.required],
      productPicture: ['', Validators.required],
      productName: ['', Validators.required],
      productDescription: ['', Validators.required],
      status: ['', Validators.required],
      paymentCode: ['', Validators.required]
    });
    this.itemTmp = {
      orderCode: '',
      productCode: '',
      factureCode: '',
      totalPrice: 0,
      orderDate: '',
      quantity: 0,
      userEmail: '',
      productPicture: '',
      productName: '',
      productDescription: '',
      status: 1,
      paymentCode: ''
    };
  }

  getAll(): Observable<OrderProduct[]> {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    return this.http.get<OrderProduct[]>(this.ROOT_URL + 'orderProduct/getAllOrderProduct', {headers});
  }

  getAllProduct(): Observable<Product[]> {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    return this.http.get<Product[]>(this.ROOT_URL + 'product/getAllProduct', {headers});
  }

  getAllPayment(): Observable<Payment[]> {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    return this.http.get<Payment[]>(this.ROOT_URL + 'payment/getAllPayment', {headers});
  }

  getAllUser(): Observable<User[]> {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    return this.http.get<User[]>(this.ROOT_URL + 'user/getAllUser', {headers});
  }

  select(item) {
    this.itemSelected = item;
    this.form.setValue({
      orderCode: item.orderCode,
      productCode: item.productCode,
      factureCode: item.factureCode,
      totalPrice: item.totalPrice,
      orderDate: item.orderDate,
      quantity: item.quantity,
      userEmail: item.userEmail,
      productPicture: item.productPicture,
      productName: item.productName,
      productDescription: item.productDescription,
      status: item.status,
      paymentCode: item.paymentCode
    });
  }

  delete(item) {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    this.http.get<any[]>(this.ROOT_URL + 'orderProduct/deleteOrderProduct?orderProductCode=' + item.orderCode, {headers}).subscribe(
      (data: any[]) => {
        this.items = this.getAll();
      }
    );
  }

  openCreateModal() {
    this.formCreate.setValue({
      orderCode: '',
      productCode: '',
      factureCode: '',
      totalPrice: 0,
      orderDate: '',
      quantity: 0,
      userEmail: '',
      productPicture: '',
      productName: '',
      productDescription: '',
      status: 1,
      paymentCode: ''
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }
  get fCreate() {
    return this.formCreate.controls;
  }

  onSubmit() {

    // stop here if form is invalid
    this.submitted = true;
    if(!this.form.valid) {
      return;
    }

    this.itemSelected.orderCode = this.form.value.orderCode;
    this.itemSelected.productCode = this.form.value.productCode;
    this.itemSelected.factureCode = this.form.value.factureCode;
    this.itemSelected.totalPrice = this.form.value.totalPrice;
    this.itemSelected.orderDate = this.form.value.orderDate;
    this.itemSelected.quantity = this.form.value.quantity;
    this.itemSelected.userEmail = this.form.value.userEmail;
    this.itemSelected.productPicture = this.form.value.productPicture;
    this.itemSelected.productName = this.form.value.productName;
    this.itemSelected.productDescription = this.form.value.productDescription;
    this.itemSelected.status = this.form.value.status;
    this.itemSelected.paymentCode = this.form.value.paymentCode;
    this.http.post(this.ROOT_URL + 'orderProduct/updateOrder', this.itemSelected).subscribe(
      (data: any[]) => {
        this.items = this.getAll();
      });

    $('.close').click();
  }

  onSubmitCreate() {

    // stop here if form is invalid
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    this.itemTmp.orderCode = this.formCreate.value.orderCode;
    this.itemTmp.productCode = this.formCreate.value.productCode;
    this.itemTmp.factureCode = this.formCreate.value.factureCode;
    this.itemTmp.totalPrice = this.formCreate.value.totalPrice;
    this.itemTmp.orderDate = this.formCreate.value.orderDate;
    this.itemTmp.quantity = this.formCreate.value.quantity;
    this.itemTmp.userEmail = this.formCreate.value.userEmail;
    this.itemTmp.productPicture = this.formCreate.value.productPicture;
    this.itemTmp.productName = this.formCreate.value.productName;
    this.itemTmp.productDescription = this.formCreate.value.productDescription;
    this.itemTmp.status = this.formCreate.value.status;
    this.itemTmp.paymentCode = this.formCreate.value.paymentCode;

    // const result = this.http.post(this.ROOT_URL + 'user/insertUser', this.user, {headers});
    this.http.post(this.ROOT_URL + 'orderProduct/insertOrderProduct', this.itemTmp).subscribe(
      (data: any[]) => {
        this.items = this.getAll();
      });

    $('.close').click();
  }

}
