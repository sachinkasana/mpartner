import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EWarrantyComponent } from './e-warranty.component';

describe('EWarrantyComponent', () => {
  let component: EWarrantyComponent;
  let fixture: ComponentFixture<EWarrantyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EWarrantyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EWarrantyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
