import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRequirementComponent } from './select-requirement.component';

describe('SelectRequirementComponent', () => {
  let component: SelectRequirementComponent;
  let fixture: ComponentFixture<SelectRequirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectRequirementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
