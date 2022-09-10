import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerNavigateComponent } from './banner-navigate.component';

describe('BannerNavigateComponent', () => {
  let component: BannerNavigateComponent;
  let fixture: ComponentFixture<BannerNavigateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerNavigateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerNavigateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
