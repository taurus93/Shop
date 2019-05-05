import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Category} from '../../model/Category';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../../model/User';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as $ from 'jquery';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  form: FormGroup;
  formCreate: FormGroup;
  users: Observable<User[]>;
  itemSelected: User;
  itemTmp: User;
  status: 0;
  readonly ROOT_URL = 'http://localhost:8007/ShopeeDao/';

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.users = this.getAllUser();
    this.form = this.formBuilder.group({
      userName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      profile: ['', Validators.required],
    });
    this.formCreate = this.formBuilder.group({
      userName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      profile: ['', Validators.required],
    });
    this.itemTmp = {
      userName: '',
      userEmail: '',
      password: '',
      profile: ''
    };
  }

  getAllUser(): Observable<User[]> {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    return this.http.get<User[]>(this.ROOT_URL + 'user/getAllUser', {headers});
  }

  select(item) {
    this.itemSelected = item;
    this.form.setValue({
      userName: item.userName,
      userEmail: item.userEmail,
      password: item.password,
      profile: item.profile
    });
  }

  delete(item) {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    this.http.get<any[]>(this.ROOT_URL + 'user/deleteUser?userEmail=' + item.userEmail, {headers}).subscribe(
      (data: any[]) => {
        this.users = this.getAllUser();
      }
    );
  }

  openCreateModal() {
    this.formCreate.setValue({
      userName: '',
      userEmail: '',
      password: '',
      profile: ''
    });
  }

  onSubmit() {

    // stop here if form is invalid

    this.itemSelected.userName = this.form.value.userName;
    this.itemSelected.userEmail = this.form.value.userEmail;
    this.itemSelected.password = this.form.value.password;
    this.itemSelected.profile = this.form.value.profile;

    this.http.post(this.ROOT_URL + 'user/updateUser', this.itemSelected).subscribe(
    (data: any[]) => {
      this.users = this.getAllUser();
    });

    $('.close').click();
  }

  onSubmitCreate() {

    // stop here if form is invalid
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    this.itemTmp.userName = this.formCreate.value.userName;
    this.itemTmp.userEmail = this.formCreate.value.userEmail;
    this.itemTmp.password = this.formCreate.value.password;
    this.itemTmp.profile = this.formCreate.value.profile;

    // const result = this.http.post(this.ROOT_URL + 'user/insertUser', this.user, {headers});
    this.http.post(this.ROOT_URL + 'user/insertUser', this.itemTmp).subscribe(
    (data: any[]) => {
      this.users = this.getAllUser();
    });

    $('.close').click();
  }

}
