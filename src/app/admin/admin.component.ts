import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {

  @Input() name: string;
  constructor() { }

  ngOnInit() {
  }
}
