import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMngComponent } from './payment-mng.component';

describe('PaymentMngComponent', () => {
  let component: PaymentMngComponent;
  let fixture: ComponentFixture<PaymentMngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentMngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentMngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
