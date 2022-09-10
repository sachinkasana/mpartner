import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinelabComponent } from './pinelab.component';

describe('PinelabComponent', () => {
  let component: PinelabComponent;
  let fixture: ComponentFixture<PinelabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PinelabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PinelabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
