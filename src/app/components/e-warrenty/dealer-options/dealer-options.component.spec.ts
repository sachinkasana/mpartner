import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerOptionsComponent } from './dealer-options.component';

describe('DealerOptionsComponent', () => {
  let component: DealerOptionsComponent;
  let fixture: ComponentFixture<DealerOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
