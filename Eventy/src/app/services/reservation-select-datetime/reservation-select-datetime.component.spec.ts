import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';

import { ReservationSelectDatetimeComponent } from './reservation-select-datetime.component';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { ReservationsService } from '../services/reservations/reservations-service.service';
import { SolutionCard } from '../../solutions/model/solution-card.model';
import { EventCard } from '../../events/model/event-card.model';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { ReviewService } from '../../reviews/service/review.service';
import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../infrastructure/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DatepickerModule } from '../../infrastructure/datepicker/datepicker.module';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { YesNoFancierDialogComponent } from '../../shared/yes-no-fancier-dialog/yes-no-fancier-dialog.component';
import { Reservation } from '../model/reservations.model';
import { formatDate } from '@angular/common';
import { SuccessfulDialogComponent } from '../../shared/successful-dialog/successful-dialog.component';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';

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
                                     providerImageUrl: "string", isFavorite: false,
                                     minReservationTime: 60, maxReservationTime: 60, reservationDeadline: 3 };
  
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
      imports: [FormsModule, ReactiveFormsModule, MaterialModule, RouterModule,
                BrowserAnimationsModule, DatepickerModule, MatFormFieldModule,
                MatInputModule, MatCheckboxModule, MatCardModule, NgxMatTimepickerModule],
      declarations: [ReservationSelectDatetimeComponent, MockAppServiceCardComponent],
      providers: [
        { provide: ReservationsService, useValue: reservationServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ReviewService, useValue: reviewServiceSpy },
        { provide: ActivatedRoute, useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => 'some-id'
              }
            }
          }
        },
        MatDialog, Router
      ],
    }) .compileComponents();

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

  it('should set isFixedDuration and validators correctly in ngOnInit', () => {
    component.selectedService = mockSolution;

    component.ngOnInit();
    expect(component.isFixedDuration).toBeTrue();
    expect(component.endTimeControl.validator).toBeNull(); 
  });

  it('should invalidate date that is too early (falls into reservation deadline)', () => {
    component.selectedService = mockSolution; // deadline = 3 days here

    const tooEarly = new Date();
    tooEarly.setDate(tooEarly.getDate() + 1);
    component.dateControl.setValue(tooEarly.toISOString());

    const errors = component.dateValidator()(component.dateControl);
    expect(errors).toEqual(jasmine.objectContaining({ tooEarly: true }));
  });

  it('should return invalidTime error when start is after end', () => {
    component.selectedService = mockSolution;

    component.selectedEndTime = new Date('2025-08-07T10:00:00');
    const control = new FormControl('11:00 AM');
    const error = component.startTimeValidator()(control);
    
    expect(error).toEqual({ invalidTime: true });
  });

  it('should return durationTooShort when duration is too short', () => {
    component.selectedService = { ...mockSolution, minReservationTime: 60, maxReservationTime: 120 };
    component.selectedEndTime = new Date('2025-08-07T11:00:00');
    const control = new FormControl('10:30 AM'); // 30 min duration 

    const error = component.startTimeValidator()(control);
    expect(error).toEqual({ durationTooShort: true });
  });

  it('should return durationTooLong when duration is too long', () => {
    component.selectedService = { ...mockSolution, minReservationTime: 30, maxReservationTime: 60 };
    component.selectedEndTime = new Date('2025-08-07T12:30:00');
    const control = new FormControl('11:00 AM'); // 90 min

    const error = component.startTimeValidator()(control);
    expect(error).toEqual({ durationTooLong: true });
  });

  it('should open confirmation dialog, proceed on confirmation, call createReservation with correct data', () => {
    component.selectedService = mockSolution;
    component.selectedEvent = mockEvent;

    const mockDate = new Date();
    mockDate.setDate(mockDate.getDate() + 20);

    component.dateControl.setValue(mockDate);
    component.startTimeControl.setValue('10:00 AM');
    component.endTimeControl.setValue('11:00 AM');

    (window as any).parseTimeTo24HourFormat = (time: string) => {
      if (time === '10:00 AM') return '10:00';
      if (time === '11:00 AM') return '11:00';
      return '00:00';
    };

    const formattedStartTime = (window as any).parseTimeTo24HourFormat(component.startTimeControl.value); 
    const formattedEndTime = (window as any).parseTimeTo24HourFormat(component.endTimeControl.value); 

    const formattedMockDate = formatDate(component.dateControl.value, 'yyyy-MM-dd', 'en-US');
    const reservation: Reservation  = {
      selectedEventId: mockEvent.eventId,
      selectedServiceId: mockSolution.solutionId,
      reservationStartDateTime: `${formattedMockDate}T${formattedStartTime}:00`,
      reservationEndDateTime:`${formattedMockDate}T${formattedEndTime}:00`,
    };

    reservationService.createReservation.and.returnValue(of(reservation));

    const dialogRefMock = {
      afterClosed: () => of(true) // user clicks "Yes"
    };

    const openSpy = spyOn(dialog, 'open').and.callFake((componentType: any) => {
      if (componentType === YesNoFancierDialogComponent) {
        return dialogRefMock as any;

      } else if (componentType === SuccessfulDialogComponent) {
        return {
          afterClosed: () => of() // auto-close success dialog
        } as any;
      }
      return {} as any;
    });

    component.onContinueButtonClicked();

    expect(openSpy).toHaveBeenCalledWith(YesNoFancierDialogComponent, jasmine.objectContaining({
      data: {
        title: 'Confirm Reservation',
        message: 'Are you sure you want to proceed with creating the reservation?'
      }
    }));

    expect(openSpy).toHaveBeenCalledWith(SuccessfulDialogComponent, jasmine.objectContaining({
      data: {
        title: 'Creation Successful',
        message: 'Your service reservation was successful!'
      }
    }));

    expect(reservationService.createReservation).toHaveBeenCalledWith(reservation);
  });

  it('should open ErrorDialog when the new reservation falls into reservation deadline (too early to reserve)', () => {
    component.selectedService = mockSolution;
    component.selectedEvent = mockEvent;

    const mockDate = new Date();
    mockDate.setDate(mockDate.getDate() + 1);

    component.dateControl.setValue(mockDate);
    component.startTimeControl.setValue('10:00 AM');
    component.endTimeControl.setValue('11:00 AM');
    component.endTimeControl.updateValueAndValidity();
    component.startTimeControl.updateValueAndValidity();

    (window as any).parseTimeTo24HourFormat = (time: string) => {
      if (time === '10:00 AM') return '10:00';
      if (time === '11:00 AM') return '11:00';
      return '00:00';
    };

    reservationService.createReservation.and.returnValue(throwError(() => new Error('Creation failed')));

    const dialogRefMock = {
      afterClosed: () => of(true) // user clicks "Yes"
    };

    const openSpy = spyOn(dialog, 'open').and.callFake((componentType: any) => {
      if (componentType === YesNoFancierDialogComponent) {
        return dialogRefMock as any;

      } else if (componentType === ErrorDialogComponent) {
        return {
          afterClosed: () => of() // auto-close success dialog
        } as any;
      }
      return {} as any;
    });

    component.onContinueButtonClicked();

    expect(openSpy).toHaveBeenCalledWith(ErrorDialogComponent, jasmine.objectContaining({
      data: {
        title: 'Invalid data',
        message: "Please make sure that all inputs are valid before confirming the reservation."
      }
    }));

    expect(reservationService.createReservation).toHaveBeenCalledTimes(0);

    const errors = component.dateValidator()(component.dateControl);
    expect(errors).toEqual(jasmine.objectContaining({ tooEarly: true }));
  });

  it("should open ErrorDialog when the reservation's start date is after the end date", () => {
    component.selectedService = mockSolution;
    component.selectedEvent = mockEvent;

    const mockDate = new Date();
    mockDate.setDate(mockDate.getDate() + 20);
    component.dateControl.setValue(mockDate);

    const endTime = new Date();
    endTime.setHours(10);
    component.selectedEndTime = endTime;
    const control = new FormControl('11:00 AM');
    const error = component.startTimeValidator()(control);  

    (window as any).parseTimeTo24HourFormat = (time: string) => {
      if (time === '10:00 AM') return '10:00';
      if (time === '11:00 AM') return '11:00';
      return '00:00';
    };

    reservationService.createReservation.and.returnValue(throwError(() => new Error('Creation failed')));

    const dialogRefMock = {
      afterClosed: () => of(true) // user clicks "Yes"
    };

    const openSpy = spyOn(dialog, 'open').and.callFake((componentType: any) => {
      if (componentType === YesNoFancierDialogComponent) {
        return dialogRefMock as any;

      } else if (componentType === ErrorDialogComponent) {
        return {
          afterClosed: () => of() // auto-close success dialog
        } as any;
      }
      return {} as any;
    });

    component.onContinueButtonClicked();
    
    expect(openSpy).toHaveBeenCalledWith(ErrorDialogComponent, jasmine.objectContaining({
      data: {
        title: 'Invalid data',
        message: "Please make sure that all inputs are valid before confirming the reservation."
      }
    }));

    expect(reservationService.createReservation).toHaveBeenCalledTimes(0);

    expect(error).toEqual({ invalidTime: true });
  });

  it("should open ErrorDialog when the reservation duration is too short", () => {
    component.selectedService = { ...mockSolution, minReservationTime: 60, maxReservationTime: 120 };
    component.selectedEvent = mockEvent;

    const mockDate = new Date();
    mockDate.setDate(mockDate.getDate() + 10);
    component.dateControl.setValue(mockDate);

    const endTime = new Date();
    endTime.setHours(11);
    component.selectedEndTime = endTime;
    const control = new FormControl('10:30 AM'); // 30 min duration 
    component.startTimeValidator()(control);

    (window as any).parseTimeTo24HourFormat = (time: string) => {
      if (time === '10:30 AM') return '10:30';
      if (time === '11:00 AM') return '11:00';
      return '00:00';
    };

    reservationService.createReservation.and.returnValue(throwError(() => new Error('Creation failed')));

    const dialogRefMock = {
      afterClosed: () => of(true) // user clicks "Yes"
    };

    const openSpy = spyOn(dialog, 'open').and.callFake((componentType: any) => {
      if (componentType === YesNoFancierDialogComponent) {
        return dialogRefMock as any;

      } else if (componentType === ErrorDialogComponent) {
        return {
          afterClosed: () => of() // auto-close success dialog
        } as any;
      }
      return {} as any;
    });

    component.onContinueButtonClicked();
    
    expect(openSpy).toHaveBeenCalledWith(ErrorDialogComponent, jasmine.objectContaining({
      data: {
        title: 'Invalid data',
        message: "Please make sure that all inputs are valid before confirming the reservation."
      }
    }));

    expect(reservationService.createReservation).toHaveBeenCalledTimes(0);
  });
  
  it("should open ErrorDialog when the reservation duration is too long", () => {
    component.selectedService = { ...mockSolution, minReservationTime: 60, maxReservationTime: 120 };
    component.selectedEvent = mockEvent;

    const mockDate = new Date();
    mockDate.setDate(mockDate.getDate() + 10);
    component.dateControl.setValue(mockDate);

    const endTime = new Date();
    endTime.setHours(14);
    component.selectedEndTime = endTime;
    const control = new FormControl('10:30 AM'); // 30 min duration 
    const error = component.startTimeValidator()(control);

    (window as any).parseTimeTo24HourFormat = (time: string) => {
      if (time === '10:30 AM') return '10:30';
      if (time === '14:00 PM') return '14:00';
      return '00:00';
    };

    reservationService.createReservation.and.returnValue(throwError(() => new Error('Creation failed')));

    const dialogRefMock = {
      afterClosed: () => of(true) // user clicks "Yes"
    };

    const openSpy = spyOn(dialog, 'open').and.callFake((componentType: any) => {
      if (componentType === YesNoFancierDialogComponent) {
        return dialogRefMock as any;

      } else if (componentType === ErrorDialogComponent) {
        return {
          afterClosed: () => of() // auto-close success dialog
        } as any;
      }
      return {} as any;
    });

    component.onContinueButtonClicked();
    
    expect(openSpy).toHaveBeenCalledWith(ErrorDialogComponent, jasmine.objectContaining({
      data: {
        title: 'Invalid data',
        message: "Please make sure that all inputs are valid before confirming the reservation."
      }
    }));

    expect(reservationService.createReservation).toHaveBeenCalledTimes(0);

    expect(error).toEqual({ durationTooLong: true });
  });

  it('should open ErrorDialog and not create a review when createReservation fails on backend side', fakeAsync(() => {
    component.selectedService = mockSolution;
    component.selectedEvent = mockEvent;

    const mockDate = new Date();
    mockDate.setDate(mockDate.getDate() + 20);

    component.dateControl.setValue(mockDate);
    component.startTimeControl.setValue('10:00 AM');
    component.endTimeControl.setValue('11:00 AM');

    (window as any).parseTimeTo24HourFormat = (time: string) => {
      if (time === '10:00 AM') return '10:00';
      if (time === '11:00 AM') return '11:00';
      return '00:00';
    };

    const formattedStartTime = (window as any).parseTimeTo24HourFormat(component.startTimeControl.value); 
    const formattedEndTime = (window as any).parseTimeTo24HourFormat(component.endTimeControl.value); 

    const formattedMockDate = formatDate(component.dateControl.value, 'yyyy-MM-dd', 'en-US');
    const reservation: Reservation  = {
      selectedEventId: mockEvent.eventId,
      selectedServiceId: mockSolution.solutionId,
      reservationStartDateTime: `${formattedMockDate}T${formattedStartTime}:00`,
      reservationEndDateTime:`${formattedMockDate}T${formattedEndTime}:00`,
    };

    reservationService.createReservation.and.returnValue(throwError(() => ({ error: ['ERROR: Failed on backend side.'] })));

    const dialogRefMock = {
      afterClosed: () => of(true) // user clicks "Yes"
    };

    const openSpy = spyOn(dialog, 'open').and.callFake((componentType: any) => {
      if (componentType === YesNoFancierDialogComponent) {
        return dialogRefMock as any;

      } else if (componentType === ErrorDialogComponent) {
        return {
          afterClosed: () => of() // auto-close success dialog
        } as any;
      }
      return {} as any;
    });

    component.onContinueButtonClicked();

    flush(); // simulate passage of async time

    expect(openSpy).toHaveBeenCalledWith(YesNoFancierDialogComponent, jasmine.objectContaining({
      data: {
        title: 'Confirm Reservation',
        message: 'Are you sure you want to proceed with creating the reservation?'
      }
    }));

    expect(openSpy).toHaveBeenCalledWith(ErrorDialogComponent, jasmine.objectContaining({
      data: {
        title: 'Creation Failed',
        message: "Failed on backend side."
      }
    }));

    expect(reservationService.createReservation).toHaveBeenCalledWith(reservation);
  }));
});
