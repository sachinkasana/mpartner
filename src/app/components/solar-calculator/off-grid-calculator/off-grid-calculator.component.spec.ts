import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffGridCalculatorComponent } from './off-grid-calculator.component';

describe('OffGridCalculatorComponent', () => {
  let component: OffGridCalculatorComponent;
  let fixture: ComponentFixture<OffGridCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffGridCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffGridCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
