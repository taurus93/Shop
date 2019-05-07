import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {OrderDetail} from '../../model/OrderDetail';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-facture-mng',
  templateUrl: './facture-mng.component.html',
  styleUrls: ['./facture-mng.component.scss']
})
export class FactureMngComponent implements OnInit {

  form: FormGroup;
  formCreate: FormGroup;
  items: Observable<OrderDetail[]>;
  itemSelected: OrderDetail;
  itemTmp: OrderDetail;
  status: 0;
  readonly ROOT_URL = 'http://localhost:8007/ShopeeDao/';

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.items = this.getAll();
    this.form = this.formBuilder.group({
      orderDetailCode: ['', Validators.required],
      orderDate: ['', Validators.required],
      quantity: ['', Validators.required],
      totalPrice: ['', Validators.required],
      productPicture: ['', Validators.required],
      productName: ['', Validators.required],
      productDescription: ['', Validators.required],
      productID_FK: ['', Validators.required],
      userEmail_FK: ['', Validators.required],
      paymentID_FK: ['', Validators.required]
    });
    this.formCreate = this.formBuilder.group({
      orderDetailCode: ['', Validators.required],
      orderDate: ['', Validators.required],
      quantity: ['', Validators.required],
      totalPrice: ['', Validators.required],
      productPicture: ['', Validators.required],
      productName: ['', Validators.required],
      productDescription: ['', Validators.required],
      productID_FK: ['', Validators.required],
      userEmail_FK: ['', Validators.required],
      paymentID_FK: ['', Validators.required]
    });
    this.itemTmp = {
      orderDetailCode: '',
      orderDate: '',
      quantity: 0,
      totalPrice: 0,
      productPicture: '',
      productName: '',
      productDescription: '',
      productID_FK: 0,
      userEmail_FK: '',
      paymentID_FK: 0
    };
  }

  getAll(): Observable<OrderDetail[]> {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    return this.http.get<OrderDetail[]>(this.ROOT_URL + 'orderDetail/getAllOrder', {headers});
  }

  select(item) {
    this.itemSelected = item;
    this.form.setValue({
      orderDetailCode: item.orderDetailCode,
      orderDate: item.orderDate,
      quantity: item.quantity,
      totalPrice: item.totalPrice,
      productPicture: item.productPicture,
      productName: item.productName,
      productDescription: item.productDescription,
      productID_FK: item.productID_FK,
      userEmail_FK: item.userEmail_FK,
      paymentID_FK: item.paymentID_FK
    });
  }

  delete(item) {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    this.http.get<any[]>(this.ROOT_URL + 'orderDetail/deleteOrder?orderCode=' + item.orderDetailCode, {headers}).subscribe(
      (data: any[]) => {
        this.items = this.getAll();
      }
    );
  }

  openCreateModal() {
    this.formCreate.setValue({
      orderDetailCode: '',
      orderDate: '',
      quantity: 0,
      totalPrice: 0,
      productPicture: '',
      productName: '',
      productDescription: '',
      productID_FK: 0,
      userEmail_FK: '',
      paymentID_FK: 0
    });
  }

  onSubmit() {

    // stop here if form is invalid

    this.itemSelected.orderDetailCode = this.form.value.orderDetailCode;
    this.itemSelected.orderDate = this.form.value.orderDate;
    this.itemSelected.quantity = this.form.value.quantity;
    this.itemSelected.totalPrice = this.form.value.totalPrice;
    this.itemSelected.productPicture = this.form.value.productPicture;
    this.itemSelected.productName = this.form.value.productName;
    this.itemSelected.productDescription = this.form.value.productDescription;
    this.itemSelected.productID_FK = this.form.value.productID_FK;
    this.itemSelected.userEmail_FK = this.form.value.userEmail_FK;
    this.itemSelected.paymentID_FK = this.form.value.paymentID_FK;
    this.http.post(this.ROOT_URL + 'orderDetail/updateOrder', this.itemSelected).subscribe(
      (data: any[]) => {
        this.items = this.getAll();
      });

    $('.close').click();
  }

  onSubmitCreate() {

    // stop here if form is invalid
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    this.itemTmp.orderDetailCode = this.formCreate.value.orderDetailCode;
    this.itemTmp.orderDate = this.formCreate.value.orderDate;
    this.itemTmp.quantity = this.formCreate.value.quantity;
    this.itemTmp.totalPrice = this.formCreate.value.totalPrice;
    this.itemTmp.productPicture = this.formCreate.value.productPicture;
    this.itemTmp.productName = this.formCreate.value.productName;
    this.itemTmp.productDescription = this.formCreate.value.productDescription;
    this.itemTmp.productID_FK = this.formCreate.value.productID_FK;
    this.itemTmp.userEmail_FK = this.formCreate.value.userEmail_FK;
    this.itemTmp.paymentID_FK = this.formCreate.value.paymentID_FK;

    // const result = this.http.post(this.ROOT_URL + 'user/insertUser', this.user, {headers});
    this.http.post(this.ROOT_URL + 'orderDetail/insertOrder', this.itemTmp).subscribe(
      (data: any[]) => {
        this.items = this.getAll();
      });

    $('.close').click();
  }

}
