import { TestBed } from '@angular/core/testing';

import { EWarrantyService } from './e-warranty.service';

describe('EWarrantyService', () => {
  let service: EWarrantyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EWarrantyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
