import { TestBed } from '@angular/core/testing';

import { SolutionsService } from './solutions-service.service';

describe('SolutionsServiceService', () => {
  let service: SolutionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolutionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
