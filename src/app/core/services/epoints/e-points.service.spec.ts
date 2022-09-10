import { TestBed } from '@angular/core/testing';

import { EPointsService } from './e-points.service';

describe('EPointsService', () => {
  let service: EPointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EPointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
