import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YouTubeVideosComponent } from './you-tube-videos.component';

describe('YouTubeVideosComponent', () => {
  let component: YouTubeVideosComponent;
  let fixture: ComponentFixture<YouTubeVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YouTubeVideosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YouTubeVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
