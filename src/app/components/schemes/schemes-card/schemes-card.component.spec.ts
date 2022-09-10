import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemesCardComponent } from './schemes-card.component';

describe('SchemesCardComponent', () => {
  let component: SchemesCardComponent;
  let fixture: ComponentFixture<SchemesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchemesCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
