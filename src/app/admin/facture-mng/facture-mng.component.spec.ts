import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureMngComponent } from './facture-mng.component';

describe('FactureMngComponent', () => {
  let component: FactureMngComponent;
  let fixture: ComponentFixture<FactureMngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactureMngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactureMngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
