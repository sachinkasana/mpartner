import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerialNumberListComponent } from './serial-number-list.component';

describe('SerialNumberListComponent', () => {
  let component: SerialNumberListComponent;
  let fixture: ComponentFixture<SerialNumberListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SerialNumberListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SerialNumberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
