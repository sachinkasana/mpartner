import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckWarrantyStatusComponent } from './check-warranty-status.component';

describe('CheckWarrantyStatusComponent', () => {
  let component: CheckWarrantyStatusComponent;
  let fixture: ComponentFixture<CheckWarrantyStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckWarrantyStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckWarrantyStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
