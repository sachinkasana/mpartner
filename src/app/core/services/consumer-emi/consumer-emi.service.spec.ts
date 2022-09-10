import { TestBed } from '@angular/core/testing';

import { ConsumerEmiService } from './consumer-emi.service';

describe('ConsumerEmiService', () => {
  let service: ConsumerEmiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsumerEmiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
