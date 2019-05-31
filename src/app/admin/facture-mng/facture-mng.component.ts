import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Facture} from '../../model/Facture';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../../model/User';
import {Receiver} from '../../model/Receiver';

@Component({
  selector: 'app-facture-mng',
  templateUrl: './facture-mng.component.html',
  styleUrls: ['./facture-mng.component.scss']
})
export class FactureMngComponent implements OnInit {

  form: FormGroup;
  formCreate: FormGroup;
  items: Observable<Facture[]>;
  itemSelected: Facture;
  itemTmp: Facture;
  submitted: boolean = false;
  listReceiver: Observable<Receiver[]>;
  status: 0;
  readonly ROOT_URL = 'http://localhost:8007/ShopeeDao/';

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.items = this.getAll();
    this.listReceiver = this.getAllReceiver();
    this.form = this.formBuilder.group({
      factureCode: ['', Validators.required],
      userEmail: ['', Validators.required],
      quantity: ['', Validators.required],
      totalPrice: ['', Validators.required],
      status: ['', Validators.required],
      receiverCode: ['', Validators.required]
    });
    this.formCreate = this.formBuilder.group({
      factureCode: ['', Validators.required],
      userEmail: ['', Validators.required],
      quantity: ['', Validators.required],
      totalPrice: ['', Validators.required],
      status: ['', Validators.required],
      receiverCode: ['', Validators.required]
    });
    this.itemTmp = {
      factureCode: '',
      userEmail: '',
      quantity: 0,
      totalPrice: 0,
      status: '',
      receiverCode: ''
    };
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }
  get fCreate() {
    return this.formCreate.controls;
  }

  getAll(): Observable<Facture[]> {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    return this.http.get<Facture[]>(this.ROOT_URL + 'facture/getAllFacture', {headers});
  }
  getAllReceiver(): Observable<Receiver[]> {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    return this.http.get<Receiver[]>(this.ROOT_URL + 'receiver/getAllReceiver', {headers});
  }

  select(item) {
    this.itemSelected = item;
    this.form.setValue({
      factureCode: item.factureCode,
      userEmail: item.userEmail,
      quantity: item.quantity,
      totalPrice: item.totalPrice,
      status: item.status,
      receiverCode: item.receiverCode
    });
  }

  delete(item) {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    this.http.get<any[]>(this.ROOT_URL + 'Facture/deleteOrder?orderCode=' + item.factureCode, {headers}).subscribe(
      (data: any[]) => {
        this.items = this.getAll();
      }
    );
  }

  openCreateModal() {
    this.formCreate.setValue({
      factureCode: '',
      userEmail: '',
      quantity: 0,
      totalPrice: 0,
      status: '',
      receiverCode: ''
    });
  }

  onSubmit() {

    // stop here if form is invalid
    this.submitted = true;
    if(this.form.invalid) {
      return;
    }

    this.itemSelected.factureCode = this.form.value.factureCode;
    this.itemSelected.userEmail = this.form.value.userEmail;
    this.itemSelected.quantity = this.form.value.quantity;
    this.itemSelected.totalPrice = this.form.value.totalPrice;
    this.itemSelected.status = this.form.value.status;
    this.itemSelected.receiverCode = this.form.value.receiverCode;
    this.http.post(this.ROOT_URL + 'facture/updateFacture', this.itemSelected).subscribe(
      (data: any[]) => {
        this.items = this.getAll();
      });

    $('.close').click();
  }

  onSubmitCreate() {

    // stop here if form is invalid
    this.submitted = true;
    if(this.formCreate.invalid) {
      return;
    }

    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    this.itemTmp.factureCode = this.formCreate.value.factureCode;
    this.itemTmp.userEmail = this.formCreate.value.userEmail;
    this.itemTmp.quantity = this.formCreate.value.quantity;
    this.itemTmp.totalPrice = this.formCreate.value.totalPrice;
    this.itemTmp.status = this.formCreate.value.status;
    this.itemTmp.receiverCode = this.formCreate.value.receiverCode;

    // const result = this.http.post(this.ROOT_URL + 'user/insertUser', this.user, {headers});
    this.http.post(this.ROOT_URL + 'facture/insertFacture', this.itemTmp).subscribe(
      (data: any[]) => {
        this.items = this.getAll();
      });

    $('.close').click();
  }

}
