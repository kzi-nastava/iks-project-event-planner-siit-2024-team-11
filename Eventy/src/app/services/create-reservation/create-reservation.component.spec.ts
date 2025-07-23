import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateReservationComponent } from './create-reservation.component';
import { ReservationSelectEventComponent } from '../../events/reservation-select-event/reservation-select-event.component';
import { By } from '@angular/platform-browser';
import { SolutionCard } from '../../solutions/model/solution-card.model';
import { EventCard } from '../../events/model/event-card.model';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SolutionsService } from '../../solutions/services/solutions/solutions-service.service';
import { of, throwError } from 'rxjs';

describe('CreateReservationComponent', () => {
  let component: CreateReservationComponent;
  let fixture: ComponentFixture<CreateReservationComponent>;
  let dialog: MatDialog;
  let solutionsService: SolutionsService
  
  let mockSolution: SolutionCard = { solutionId: 1, type: "SERVICE", name: 'Test Service', categoryName: "kat",
                                     description: "desc", eventTypeNames: null, price: 1, discount: 0,
                                     firstImageUrl: "f", isAvailable: true, providerId: 2, providerName: "prov",
                                     providerImageUrl: "string", isFavorite: false };

  let mockEvent: EventCard = { eventId: 1, name: 'Test Event', description: "desc", maxNumberParticipants: 2,
                               isOpen: true, eventTypeName: "et", locationName: "loc", startDate: new Date(),
                               endDate: new Date(), organiserId: 3, organiserName: "n", organiserImage: "3",
                               isFavorite: false };
                      
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateReservationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateReservationComponent);
    component = fixture.componentInstance;
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

    const dateTimeComponent = fixture.nativeElement.querySelector('app-reservation-select-datetime');
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

  it('should handle selectedEventCardEventEmitter correctly', () => {
    spyOn(component, 'onSelectedEventCard');
    component.stage = 1;
    component.selectedService = mockSolution
                               
    fixture.detectChanges();

    const childDebugElement = fixture.debugElement.query(By.directive(ReservationSelectEventComponent));
    childDebugElement.triggerEventHandler('selectedEventCardEventEmitter', mockEvent);

    expect(component.onSelectedEventCard).toHaveBeenCalledWith(mockEvent);
  });

  it('should load service on init if passed in navigation', () => {
    spyOn(solutionsService, 'getSolution').and.returnValue(of(mockSolution));

    component.passedService = mockSolution;
    component.ngOnInit();

    expect(solutionsService.getSolution).toHaveBeenCalledWith(1);
    expect(component.selectedService).toEqual(mockSolution);
  }); 

  it('should open error dialog if service loading fails', () => {
    spyOn(dialog, 'open');
    spyOn(solutionsService, 'getSolution').and.returnValue(throwError(() => new Error('failed to load the service')));

    component.passedService = mockSolution;
    component.ngOnInit();

    expect(dialog.open).toHaveBeenCalledWith(ErrorDialogComponent, jasmine.objectContaining({
      data: jasmine.objectContaining({ 
        title: 'Loading Error',
        message: jasmine.stringContaining('Please make sure that an event is selected before continuing to the next step.')
      })
    }));
  });
});
