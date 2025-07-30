import { TestBed } from '@angular/core/testing';

import { SolutionCategoryService } from './solution-category.service';

describe('SolutionCategoryService', () => {
  let service: SolutionCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolutionCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
