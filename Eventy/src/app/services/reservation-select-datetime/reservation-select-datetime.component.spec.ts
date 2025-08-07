import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationSelectDatetimeComponent } from './reservation-select-datetime.component';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { ReservationsService } from '../services/reservations/reservations-service.service';
import { SolutionCard } from '../../solutions/model/solution-card.model';
import { EventCard } from '../../events/model/event-card.model';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { ReviewService } from '../../reviews/service/review.service';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../infrastructure/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DatepickerModule } from '../../infrastructure/datepicker/datepicker.module';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';

describe('ReservationSelectDatetimeComponent', () => {
  let component: ReservationSelectDatetimeComponent;
  let fixture: ComponentFixture<ReservationSelectDatetimeComponent>;
  let dialog: MatDialog;
  let router: Router;
  let reservationService: jasmine.SpyObj<ReservationsService>;
  let authService: jasmine.SpyObj<AuthService>;
  let reviewService: jasmine.SpyObj<ReviewService>;

  let mockSolution: SolutionCard = { solutionId: 1, type: "SERVICE", name: 'Test Service', categoryName: "kat",
                                     description: "desc", eventTypeNames: null, price: 1, discount: 0,
                                     firstImageUrl: "f", isAvailable: true, providerId: 2, providerName: "prov",
                                     providerImageUrl: "string", isFavorite: false };
  
  let mockEvent: EventCard = { eventId: 1, name: 'Test Event', description: "desc", maxNumberParticipants: 2,
                               isOpen: true, eventTypeName: "et", locationName: "loc", startDate: new Date(),
                               endDate: new Date(), organiserId: 3, organiserName: "n", organiserImage: "3",
                               isFavorite: false };

  @Component({
    selector: 'app-service-card',
    template: ''
  })
  class MockAppServiceCardComponent {
    @Input() serviceCard: SolutionCard;
  }

  beforeEach(async () => {
    const reservationServiceSpy = jasmine.createSpyObj('ReservationsService', ['createReservation']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getId']);
    const reviewServiceSpy = jasmine.createSpyObj('ReviewService', ['isSolutionReviewedByUser']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, MaterialModule,
                BrowserAnimationsModule, DatepickerModule, MatFormFieldModule,
                MatInputModule, MatCheckboxModule, MatCardModule, NgxMatTimepickerModule],
      declarations: [ReservationSelectDatetimeComponent, MockAppServiceCardComponent, RouterTestingModu  ],
      providers: [
        { provide: ReservationsService, useValue: reservationServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ReviewService, useValue: reviewServiceSpy },
        MatDialog, Router
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationSelectDatetimeComponent);
    component = fixture.componentInstance;

    component.selectedEvent = mockEvent;
    component.selectedService = mockSolution;

    dialog = TestBed.inject(MatDialog);
    router = TestBed.inject(Router);
    reservationService = TestBed.inject(ReservationsService) as jasmine.SpyObj<ReservationsService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    reviewService = TestBed.inject(ReviewService) as jasmine.SpyObj<ReviewService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
