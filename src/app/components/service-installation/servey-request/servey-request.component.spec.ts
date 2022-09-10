import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServeyRequestComponent } from './servey-request.component';

describe('ServeyRequestComponent', () => {
  let component: ServeyRequestComponent;
  let fixture: ComponentFixture<ServeyRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServeyRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServeyRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
