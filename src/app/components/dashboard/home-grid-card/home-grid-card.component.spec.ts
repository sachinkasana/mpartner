import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGridCardComponent } from './home-grid-card.component';

describe('HomeGridCardComponent', () => {
  let component: HomeGridCardComponent;
  let fixture: ComponentFixture<HomeGridCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeGridCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeGridCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
