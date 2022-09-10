import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrsRejectReportComponent } from './wrs-reject-report.component';

describe('WrsRejectReportComponent', () => {
  let component: WrsRejectReportComponent;
  let fixture: ComponentFixture<WrsRejectReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrsRejectReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrsRejectReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
