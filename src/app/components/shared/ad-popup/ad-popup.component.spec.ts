import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdPopupComponent } from './ad-popup.component';

describe('AdPopupComponent', () => {
  let component: AdPopupComponent;
  let fixture: ComponentFixture<AdPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
