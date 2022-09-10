import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerOtpComponent } from './consumer-otp.component';

describe('ConsumerOtpComponent', () => {
  let component: ConsumerOtpComponent;
  let fixture: ComponentFixture<ConsumerOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumerOtpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
