import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../model/User';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  readonly ROOT_URL = 'http://localhost:8007/ShopeeDao/';

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(userEmail, password) {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    this.http.get<any[]>(this.ROOT_URL + 'user/authenticate?userEmail=' + userEmail
      + '&password=' + password, {headers})
      .subscribe(
        (data: any[]) => {
          if (data.length) {
            localStorage.setItem('currentUser', JSON.stringify(data[0]));
            this.currentUserSubject.next(data[0]);
          }
        }
      );
    // this.authenticationService.login(this.user.userEmail, this.user.password);
    // this.doLogin = true;
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
