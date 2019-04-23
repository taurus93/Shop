import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Category} from './model/Category';
import {CategoryService} from './category.service';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'my-app';
  items: MenuItem[];
  ngOnInit() {
  }
}
