import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateReservationComponent } from './create-reservation.component';
import { SolutionCard } from '../../solutions/model/solution-card.model';
import { EventCard } from '../../events/model/event-card.model';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SolutionsService } from '../../solutions/services/solutions/solutions-service.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CreateReservationComponent', () => {
  let component: CreateReservationComponent;
  let fixture: ComponentFixture<CreateReservationComponent>;
  let dialog: MatDialog;
  let router: Router;
  let solutionsService: jasmine.SpyObj<SolutionsService>;
  
  @Component({
    selector: 'app-reservation-select-event',
    template: ''
  })
  class MockReservationSelectEventComponent {}

  @Component({
    selector: 'app-reservation-select-datetime',
    template: ''
  })
  class MockReservationSelectDatetimeComponent {
    @Input() selectedEvent: EventCard;
    @Input() selectedService: SolutionCard;
  }

  let mockSolution: SolutionCard = { solutionId: 1, type: "SERVICE", name: 'Test Service', categoryName: "kat",
                                     description: "desc", eventTypeNames: null, price: 1, discount: 0,
                                     firstImageUrl: "f", isAvailable: true, providerId: 2, providerName: "prov",
                                     providerImageUrl: "string", isFavorite: false };

  let mockEvent: EventCard = { eventId: 1, name: 'Test Event', description: "desc", maxNumberParticipants: 2,
                               isOpen: true, eventTypeName: "et", locationName: "loc", startDate: new Date(),
                               endDate: new Date(), organiserId: 3, organiserName: "n", organiserImage: "3",
                               isFavorite: false };
                      
  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj('SolutionsService', ['getSolution']);

    await TestBed.configureTestingModule({
      declarations: [CreateReservationComponent, MockReservationSelectEventComponent, MockReservationSelectDatetimeComponent,],
      providers: [
        { provide: SolutionsService, useValue: serviceSpy },
        MatDialog, Router
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateReservationComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    router = TestBed.inject(Router);
    solutionsService = TestBed.inject(SolutionsService) as jasmine.SpyObj<SolutionsService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render <app-reservation-select-event> when stage is 1 and selectedService is set', () => {
    component.stage = 1;
    component.selectedService = mockSolution
    fixture.detectChanges();

    const eventComponent = fixture.nativeElement.querySelector('app-reservation-select-event');
    expect(eventComponent).not.toBeNull();
  });

  it('should render <app-reservation-select-datetime> when stage is 2 and selectedService and selectedEvent is set', () => {
    component.stage = 2;
    component.selectedService = mockSolution
    component.selectedEvent = mockEvent
    fixture.detectChanges();

    const dateTimeComponent = fixture.debugElement.query(By.css('app-reservation-select-datetime'));
    expect(dateTimeComponent).not.toBeNull();
  });

  it('should advance to stage 2 if an event is selected and continue is clicked', () => {
    component.selectedEvent = mockEvent;
    component.onContinueButtonClicked(true);
    expect(component.stage).toBe(2);
  });

  it('should open error dialog if continue is clicked and no event is selected', () => {
    spyOn(dialog, 'open');
    component.selectedEvent = null;
    component.onContinueButtonClicked(true);

    expect(dialog.open).toHaveBeenCalledWith(ErrorDialogComponent, jasmine.objectContaining({
      data: jasmine.objectContaining({
        title: 'Selection Error',
        message: jasmine.stringContaining('Please make sure that an event is selected before continuing to the next step.')
      })
    }));
  });

  it('should load service on init if passed in navigation', () => {
    solutionsService.getSolution.and.returnValue(of(mockSolution));

    component.passedService = mockSolution;
    component.ngOnInit();

    expect(solutionsService.getSolution).toHaveBeenCalledWith(1);
    expect(component.selectedService).toEqual(mockSolution);
  }); 
});
