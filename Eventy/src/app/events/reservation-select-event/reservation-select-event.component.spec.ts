import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationSelectEventComponent } from './reservation-select-event.component';
import { Component, Input } from '@angular/core';
import { EventCard } from '../model/event-card.model';
import { By } from '@angular/platform-browser';

describe('ReservationSelectEventComponent', () => {
  let component: ReservationSelectEventComponent;
  let fixture: ComponentFixture<ReservationSelectEventComponent>;

  @Component({
    selector: 'app-event-filters',
    template: ''
  })
  class MockEventFilters {}
  
  @Component({
    selector: 'app-all-events',
    template: ''
  })
  class MockAllEvents {
    @Input() searchQuery: string;
    @Input() filters: any;
    @Input() isCardClickable: Boolean;
  }

  let mockEvent: EventCard = { eventId: 1, name: 'Test Event', description: "desc", maxNumberParticipants: 2,
                               isOpen: true, eventTypeName: "et", locationName: "loc", startDate: new Date(),
                               endDate: new Date(), organiserId: 3, organiserName: "n", organiserImage: "3",
                               isFavorite: false };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservationSelectEventComponent, MockEventFilters, MockAllEvents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationSelectEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit false and null on init, and scroll to top', () => {
    spyOn(component.continueButtonClicked, 'emit');
    spyOn(component.selectedEventCardEventEmitter, 'emit');
    const scrollSpy = spyOn(window, 'scrollTo');

    component.ngOnInit();

    expect(component.continueButtonClicked.emit).toHaveBeenCalledWith(false);
    expect(component.selectedEventCardEventEmitter.emit).toHaveBeenCalledWith(null);
    expect(scrollSpy).toHaveBeenCalled();
  });

  it('should set selectedEventCard when onEventSelected is called', () => {
    component.onEventSelected(mockEvent);
    expect(component.selectedEventCard).toEqual(mockEvent);
  });
  
  it('should emit selectedEventCard and true when onContinueButtonClicked is called', () => {
    component.selectedEventCard = mockEvent;

    spyOn(component.selectedEventCardEventEmitter, 'emit');
    spyOn(component.continueButtonClicked, 'emit');

    component.onContinueButtonClicked();

    expect(component.selectedEventCardEventEmitter.emit).toHaveBeenCalledWith(mockEvent);
    expect(component.continueButtonClicked.emit).toHaveBeenCalledWith(true);
  });

  it('should update filters when handleFiltersChanged is called', () => {
    const filters = { type: 'Conference', maxParticipants: '60' };
    component.handleFiltersChanged(filters);
    expect(component.filters).toEqual(filters);
  });

  it('should reset filters when handleFiltersReset is called', () => {
    component.filters = { some: 'filter' };
    component.handleFiltersReset();
    expect(component.filters).toEqual({});
  });

  it('should update searchQuery when handleSearch is called', () => {
    component.handleSearch('new search');
    expect(component.searchQuery).toBe('new search');
  });

  it('should emit events when the CONTINUE button is clicked in the template', () => {
    component.selectedEventCard = mockEvent;

    spyOn(component.selectedEventCardEventEmitter, 'emit');
    spyOn(component.continueButtonClicked, 'emit');

    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.confirm_selection_container'));
    button.triggerEventHandler('click', null);

    expect(component.selectedEventCardEventEmitter.emit).toHaveBeenCalledWith(mockEvent);
    expect(component.continueButtonClicked.emit).toHaveBeenCalledWith(true);
  });
});
