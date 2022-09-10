import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricelistCardComponent } from './pricelist-card.component';

describe('PricelistCardComponent', () => {
  let component: PricelistCardComponent;
  let fixture: ComponentFixture<PricelistCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricelistCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PricelistCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
