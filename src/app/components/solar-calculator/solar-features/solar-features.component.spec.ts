import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolarFeaturesComponent } from './solar-features.component';

describe('SolarFeaturesComponent', () => {
  let component: SolarFeaturesComponent;
  let fixture: ComponentFixture<SolarFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolarFeaturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolarFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
