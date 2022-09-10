import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BhmrComponent } from './bhmr.component';

describe('BhmrComponent', () => {
  let component: BhmrComponent;
  let fixture: ComponentFixture<BhmrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BhmrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BhmrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
