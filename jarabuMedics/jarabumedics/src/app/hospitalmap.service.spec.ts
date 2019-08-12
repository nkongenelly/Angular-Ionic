import { TestBed } from '@angular/core/testing';

import { HospitalmapService } from './hospitalmap.service';

describe('HospitalmapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HospitalmapService = TestBed.get(HospitalmapService);
    expect(service).toBeTruthy();
  });
});
