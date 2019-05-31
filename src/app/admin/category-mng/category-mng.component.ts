import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {OrderDetail} from '../../model/OrderDetail';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as $ from 'jquery';
import {Category} from '../../model/Category';

@Component({
  selector: 'app-category-mng',
  templateUrl: './category-mng.component.html',
  styleUrls: ['./category-mng.component.scss']
})
export class CategoryMngComponent implements OnInit {

  form: FormGroup;
  formCreate: FormGroup;
  items: Observable<Category[]>;
  itemSelected: Category;
  itemTmp: Category;
  status: 0;
  readonly ROOT_URL = 'http://localhost:8007/ShopeeDao/';

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.items = this.getAll();
    this.form = this.formBuilder.group({
      categoryCode: ['', Validators.required],
      categoryName: ['', Validators.required],
      catDescription: ['', Validators.required],
      catPicture: ['', Validators.required]
    });
    this.formCreate = this.formBuilder.group({
      categoryCode: ['', Validators.required],
      categoryName: ['', Validators.required],
      catDescription: ['', Validators.required],
      catPicture: ['', Validators.required]
    });
    this.itemTmp = {
      categoryCode: '',
      categoryName: '',
      catDescription: '',
      catPicture: ''
    };
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  get fCreate() {
    return this.formCreate.controls;
  }
  getAll(): Observable<Category[]> {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    return this.http.get<Category[]>(this.ROOT_URL + 'category/getAllCategory', {headers});
  }

  select(item) {
    this.itemSelected = item;
    this.form.setValue({
      categoryCode: item.categoryCode,
      categoryName: item.categoryName,
      catDescription: item.catDescription,
      catPicture: item.catPicture
    });
  }

  delete(item) {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    this.http.get<any[]>(this.ROOT_URL + 'category/deleteCategory?categoryCode=' + item.categoryCode, {headers}).subscribe(
      (data: any[]) => {
        this.items = this.getAll();
      }
    );
  }

  openCreateModal() {
    this.formCreate.setValue({
      categoryCode: '',
      categoryName: '',
      catDescription: '',
      catPicture: ''
    });
  }

  onSubmit() {

    // stop here if form is invalid

    this.itemSelected.categoryCode = this.form.value.categoryCode;
    this.itemSelected.categoryName = this.form.value.categoryName;
    this.itemSelected.catDescription = this.form.value.catDescription;
    this.itemSelected.catPicture = '';
    this.http.post(this.ROOT_URL + 'category/updateCategory', this.itemSelected).subscribe(
      (data: any[]) => {
        this.items = this.getAll();
      });

    $('.close').click();
  }

  onSubmitCreate() {

    // stop here if form is invalid
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    this.itemTmp.categoryCode = this.formCreate.value.categoryCode;
    this.itemTmp.categoryName = this.formCreate.value.categoryName;
    this.itemTmp.catDescription = this.formCreate.value.catDescription;
    this.itemTmp.catPicture = '';

    // const result = this.http.post(this.ROOT_URL + 'user/insertUser', this.user, {headers});
    this.http.post(this.ROOT_URL + 'category/insertCategory', this.itemTmp).subscribe(
      (data: any[]) => {
        this.items = this.getAll();
      });

    $('.close').click();
  }

}
