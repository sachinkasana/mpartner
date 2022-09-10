import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffGridComponent } from './off-grid.component';

describe('OffGridComponent', () => {
  let component: OffGridComponent;
  let fixture: ComponentFixture<OffGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
