import { TestBed } from '@angular/core/testing';

import { ReservationsService } from './reservations-service.service';

describe('ReservationsServiceService', () => {
  let service: ReservationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
