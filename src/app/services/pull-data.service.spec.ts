import { TestBed } from '@angular/core/testing';

import { PullDataService } from './pull-data.service';

describe('PullDataService', () => {
  let service: PullDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PullDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
