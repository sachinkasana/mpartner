import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryDeviceComponent } from './secondary-device.component';

describe('SecondaryDeviceComponent', () => {
  let component: SecondaryDeviceComponent;
  let fixture: ComponentFixture<SecondaryDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondaryDeviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
