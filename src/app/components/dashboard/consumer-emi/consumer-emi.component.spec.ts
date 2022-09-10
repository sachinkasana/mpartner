import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerEmiComponent } from './consumer-emi.component';

describe('ConsumerEmiComponent', () => {
  let component: ConsumerEmiComponent;
  let fixture: ComponentFixture<ConsumerEmiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumerEmiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerEmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
