import {Component, Input, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Category} from '../../model/Category';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../../model/User';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as $ from 'jquery';
import {AuthenticationService} from '../../service/authentication.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() name: string;
  form: FormGroup;
  formCreate: FormGroup;
  users: Observable<User[]>;
  itemSelected: User;
  itemTmp: User;
  status: 0;
  currentUserSubscription: Subscription;
  currentUser: User;
  readonly ROOT_URL = 'http://localhost:8007/ShopeeDao/';

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private authenticationService: AuthenticationService) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    try {
      this.authenticationService.update(this.currentUser.userEmail);
    } catch (e) {
      // No content response..
    }
    if (this.currentUser.profile === 'admin') {
      this.users = this.getAllUser();
    } else {
      this.users = this.getUser();
    }
    this.form = this.formBuilder.group({
      userName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      profile: ['', Validators.required],
      street: ['', Validators.required],
      suburb: ['', Validators.required],
      city: ['', Validators.required],
      postcode: ['', Validators.required],
    });
    this.formCreate = this.formBuilder.group({
      userName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      profile: ['', Validators.required],
      street: ['', Validators.required],
      suburb: ['', Validators.required],
      city: ['', Validators.required],
      postcode: ['', Validators.required],
    });
    this.itemTmp = {
      userName: '',
      userEmail: '',
      password: '',
      profile: '',
      street: '',
      suburb: '',
      city: '',
      postcode: ''
    };
  }

  getAllUser(): Observable<User[]> {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    return this.http.get<User[]>(this.ROOT_URL + 'user/getAllUser', {headers});
  }
  getUser(): Observable<User[]> {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    return this.http.get<User[]>(this.ROOT_URL + 'user/getUserByUserEmail?userEmail=' + this.currentUser.userEmail, {headers});
  }

  select(item) {
    this.itemSelected = item;
    this.form.setValue({
      userName: item.userName,
      userEmail: item.userEmail,
      password: item.password,
      profile: item.profile,
      street: item.street,
      suburb: item.suburb,
      city: item.city,
      postcode: item.postcode
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
      profile: '',
      street: '',
      suburb: '',
      city: '',
      postcode: ''
    });
  }

  onSubmit() {

    // stop here if form is invalid

    this.itemSelected.userName = this.form.value.userName;
    this.itemSelected.userEmail = this.form.value.userEmail;
    this.itemSelected.password = this.form.value.password;
    this.itemSelected.profile = this.form.value.profile;
    this.itemSelected.street = this.form.value.street;
    this.itemSelected.suburb = this.form.value.suburb;
    this.itemSelected.city = this.form.value.city;
    this.itemSelected.postcode = this.form.value.postcode;

    this.http.post(this.ROOT_URL + 'user/updateUser', this.itemSelected).subscribe(
      (data: any[]) => {
        this.users = this.getAllUser();
      });

    $('.close').click();
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmitCreate() {

    // stop here if form is invalid
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    this.itemTmp.userName = this.formCreate.value.userName;
    this.itemTmp.userEmail = this.formCreate.value.userEmail;
    this.itemTmp.password = this.formCreate.value.password;
    this.itemTmp.profile = this.formCreate.value.profile;
    this.itemTmp.street = this.formCreate.value.street;
    this.itemTmp.suburb = this.formCreate.value.suburb;
    this.itemTmp.city = this.formCreate.value.city;
    this.itemTmp.postcode = this.formCreate.value.postcode;

    // const result = this.http.post(this.ROOT_URL + 'user/insertUser', this.user, {headers});
    this.http.post(this.ROOT_URL + 'user/insertUser', this.itemTmp).subscribe(
      (data: any[]) => {
        this.users = this.getAllUser();
      });

    $('.close').click();
  }

}
