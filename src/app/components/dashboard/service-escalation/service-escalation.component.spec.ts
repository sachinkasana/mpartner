import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceEscalationComponent } from './service-escalation.component';

describe('ServiceEscalationComponent', () => {
  let component: ServiceEscalationComponent;
  let fixture: ComponentFixture<ServiceEscalationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceEscalationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceEscalationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
