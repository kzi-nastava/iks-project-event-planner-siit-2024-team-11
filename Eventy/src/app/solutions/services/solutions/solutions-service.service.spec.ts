import { TestBed } from '@angular/core/testing';

import { SolutionsServiceService } from './solutions-service.service';

describe('SolutionsServiceService', () => {
  let service: SolutionsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolutionsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
