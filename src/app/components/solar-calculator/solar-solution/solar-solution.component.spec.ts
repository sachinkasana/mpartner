import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolarSolutionComponent } from './solar-solution.component';

describe('SolarSolutionComponent', () => {
  let component: SolarSolutionComponent;
  let fixture: ComponentFixture<SolarSolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolarSolutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolarSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
