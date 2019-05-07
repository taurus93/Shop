import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Product} from '../../model/Product';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as $ from 'jquery';
import {Payment} from '../../model/Payment';

@Component({
  selector: 'app-payment-mng',
  templateUrl: './payment-mng.component.html',
  styleUrls: ['./payment-mng.component.scss']
})
export class PaymentMngComponent implements OnInit {

  form: FormGroup;
  formCreate: FormGroup;
  items: Observable<Payment[]>;
  itemSelected: Payment;
  itemTmp: Payment;
  status: 0;
  readonly ROOT_URL = 'http://localhost:8007/ShopeeDao/';

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.items = this.getAll();
    this.form = this.formBuilder.group({
      paymentCode: ['', Validators.required],
      paymentType: ['', Validators.required]
    });
    this.formCreate = this.formBuilder.group({
      paymentCode: ['', Validators.required],
      paymentType: ['', Validators.required]
    });
    this.itemTmp = {
      paymentCode: '',
      paymentType: ''
    };
  }

  getAll(): Observable<Payment[]> {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    return this.http.get<Payment[]>(this.ROOT_URL + 'payment/getAllPayment', {headers});
  }

  select(item) {
    this.itemSelected = item;
    this.form.setValue({
      paymentCode: item.paymentCode,
      paymentType: item.paymentType
    });
  }

  delete(item) {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    this.http.get<any[]>(this.ROOT_URL + 'payment/deletePayment?paymentCode=' + item.paymentCode, {headers}).subscribe(
      (data: any[]) => {
        this.items = this.getAll();
      }
    );
  }

  openCreateModal() {
    this.formCreate.setValue({
      paymentCode: '',
      paymentType: ''
    });
  }

  onSubmit() {

    // stop here if form is invalid

    this.itemSelected.paymentCode = this.form.value.paymentCode;
    this.itemSelected.paymentType = this.form.value.paymentType;
    this.http.post(this.ROOT_URL + 'payment/updatePayment', this.itemSelected).subscribe(
      (data: any[]) => {
        this.items = this.getAll();
      });

    $('.close').click();
  }

  onSubmitCreate() {

    // stop here if form is invalid
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    this.itemTmp.paymentCode = this.formCreate.value.paymentCode;
    this.itemTmp.paymentType = this.formCreate.value.paymentType;

    // const result = this.http.post(this.ROOT_URL + 'user/insertUser', this.user, {headers});
    this.http.post(this.ROOT_URL + 'payment/insertPayment', this.itemTmp).subscribe(
      (data: any[]) => {
        this.items = this.getAll();
      });

    $('.close').click();
  }

}
