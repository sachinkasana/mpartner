import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanSerialNumberComponent } from './scan-serial-number.component';

describe('ScanSerialNumberComponent', () => {
  let component: ScanSerialNumberComponent;
  let fixture: ComponentFixture<ScanSerialNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanSerialNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanSerialNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
