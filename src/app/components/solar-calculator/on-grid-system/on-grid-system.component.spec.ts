import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnGridSystemComponent } from './on-grid-system.component';

describe('OnGridSystemComponent', () => {
  let component: OnGridSystemComponent;
  let fixture: ComponentFixture<OnGridSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnGridSystemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnGridSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
