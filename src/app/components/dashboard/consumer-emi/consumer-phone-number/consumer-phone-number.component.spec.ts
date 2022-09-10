import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerPhoneNumberComponent } from './consumer-phone-number.component';

describe('ConsumerPhoneNumberComponent', () => {
  let component: ConsumerPhoneNumberComponent;
  let fixture: ComponentFixture<ConsumerPhoneNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumerPhoneNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerPhoneNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
