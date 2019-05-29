import {Component, OnInit, VERSION} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {User} from '../../model/User';
import {HttpClient, HttpEventType, HttpHeaders, HttpResponse} from '@angular/common/http';
import * as $ from 'jquery';
import {Product} from '../../model/Product';
import {Category} from '../../model/Category';

@Component({
  selector: 'app-product-mng',
  templateUrl: './product-mng.component.html',
  styleUrls: ['./product-mng.component.scss']
})
export class ProductMngComponent implements OnInit {

  form: FormGroup;
  formCreate: FormGroup;
  items: Observable<Product[]>;
  itemSelected: Product;
  itemTmp: Product;
  status: 0;
  categories: Observable<Category[]>;
  submitted: boolean = false;
  readonly ROOT_URL = 'http://localhost:8007/ShopeeDao/';
  url = '';
  files: File[];
  listUser: Observable<User[]>;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.items = this.getAll();
    this.categories = this.getAllCategory();
    this.listUser = this.getAllUser();
    this.form = this.formBuilder.group({
      productCode: ['', Validators.required],
      productName: ['', Validators.required],
      productPrice: ['', Validators.required],
      productPicture: ['', Validators.required],
      productDescription: ['', Validators.required],
      categoryCode: ['', Validators.required],
    });
    this.formCreate = this.formBuilder.group({
      productCode: ['', Validators.required],
      productName: ['', Validators.required],
      productPrice: ['', Validators.required],
      productPicture: ['', Validators.required],
      productDescription: ['', Validators.required],
      categoryCode: ['', Validators.required],
    });
    this.itemTmp = {
      productCode: '',
      productName: '',
      productPrice: 0,
      productPicture: '',
      productDescription: '',
      categoryCode: ''
    };
  }

  getAll(): Observable<Product[]> {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    return this.http.get<Product[]>(this.ROOT_URL + 'product/getAllProduct', {headers});
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  get fCreate() {
    return this.formCreate.controls;
  }

  getAllCategory(): Observable<Category[]> {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    return this.http.get<Category[]>(this.ROOT_URL + 'category/getAllCategory', {headers});
  }

  getAllUser(): Observable<User[]> {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    return this.http.get<User[]>(this.ROOT_URL + 'user/getAllUser', {headers});
  }

  select(item) {
    this.itemSelected = item;
    this.form.setValue({
      productCode: item.productCode,
      productName: item.productName,
      productPrice: item.productPrice,
      productPicture: item.productPicture,
      productDescription: item.productDescription,
      categoryCode: item.categoryCode
    });
  }

  delete(item) {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    this.http.get<any[]>(this.ROOT_URL + 'product/deleteProduct?productCode=' + item.productCode, {headers}).subscribe(
      (data: any[]) => {
        this.items = this.getAll();
      }
    );
  }

  openCreateModal() {
    this.formCreate.setValue({
      productCode: '',
      productName: '',
      productPrice: 0,
      productPicture: '',
      productDescription: '',
      categoryCode: ''
    });
  }

  onSubmit() {

    // stop here if form is invalid
    this.submitted = true;
    if(this.form.invalid) {
      return;
    }

    this.itemSelected.productCode = this.form.value.productCode;
    this.itemSelected.productName = this.form.value.productName;
    this.itemSelected.productPrice = this.form.value.productPrice;
    this.itemSelected.productPicture = this.form.value.productPicture;
    this.itemSelected.productDescription = this.form.value.productDescription;
    this.itemSelected.categoryCode = this.form.value.categoryCode;

    this.http.post(this.ROOT_URL + 'product/updateProduct', this.itemSelected).subscribe(
      (data: any[]) => {
        this.items = this.getAll();
      });

    $('.close').click();
  }

  onSubmitCreate() {

    // stop here if form is invalid
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    this.submitted = true;
    if(this.formCreate.invalid) {
      return;
    }

    this.itemTmp.productCode = this.formCreate.value.productCode;
    this.itemTmp.productName = this.formCreate.value.productName;
    this.itemTmp.productPrice = this.formCreate.value.productPrice;
    this.itemTmp.productPicture = this.files[0].name;
    this.itemTmp.productDescription = this.formCreate.value.productDescription;
    this.categories.forEach(a => {
      for ( var i = 0; i < a.length; i++) {
        if (a[i].categoryName === this.formCreate.value.categoryCode) {
          this.itemTmp.categoryCode = a[i].categoryCode;
          this.http.post(this.ROOT_URL + 'product/insertProduct', this.itemTmp).subscribe(
            (data: any[]) => {
              this.items = this.getAll();
            });
          this.uploadAndProgress(this.files);
          $('.close').click();
        }
      }
    });

    // const result = this.http.post(this.ROOT_URL + 'user/insertUser', this.user, {headers});
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        // this.url = event.target.result;
      };
    }
  }

  //upload

  percentDone: number;
  uploadSuccess: boolean;

  version = VERSION;

  upload(files: File[]) {
    //pick from one of the 4 styles of file uploads below
    this.files = files;
  }

  basicUpload(files: File[]) {
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file', f));
    this.http.post('http://localhost:8007/uploadFile', formData)
      .subscribe(event => {
        console.log('done');
      });
  }

  //this will fail since file.io dosen't accept this type of upload
  //but it is still possible to upload a file with this style
  basicUploadSingle(file: File) {
    this.http.post('http://localhost:8007/uploadFile', file)
      .subscribe(event => {
        console.log('done');
      });
  }

  uploadAndProgress(files: File[]) {
    console.log(files);
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file', f));
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    // this.http.post('http://localhost:8007/uploadFile', { file: files }, {reportProgress: true, observe: 'events'})
    //   .subscribe(event => {
    //     if (event.type === HttpEventType.UploadProgress) {
    //       this.percentDone = Math.round(100 * event.loaded / event.total);
    //     } else if (event instanceof HttpResponse) {
    //       this.uploadSuccess = true;
    //     }
    //   });

    this.http.post('http://localhost:8007/uploadFile', formData, {reportProgress: true, observe: 'events'}).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
          this.items = this.getAll();
        }
      });
  }

  //this will fail since file.io dosen't accept this type of upload
  //but it is still possible to upload a file with this style
  uploadAndProgressSingle(file: File) {
    this.http.post('http://localhost:8007/uploadFile', file, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
        }
      });
  }

}
