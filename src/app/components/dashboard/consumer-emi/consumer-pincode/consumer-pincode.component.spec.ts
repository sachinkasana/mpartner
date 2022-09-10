import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerPincodeComponent } from './consumer-pincode.component';

describe('ConsumerPincodeComponent', () => {
  let component: ConsumerPincodeComponent;
  let fixture: ComponentFixture<ConsumerPincodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumerPincodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerPincodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
