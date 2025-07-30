import { Component, Output, EventEmitter } from '@angular/core';
import { EventCard } from '../model/event-card.model';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EventsService } from '../services/events/events-service.service';

@Component({
  selector: 'app-reservation-select-event',
  templateUrl: './reservation-select-event.component.html',
  styleUrl: './reservation-select-event.component.css'
})
export class ReservationSelectEventComponent {
  @Output() continueButtonClicked = new EventEmitter<Boolean>;
  
  selectedEventCard: EventCard = null;
  @Output() selectedEventCardEventEmitter = new EventEmitter<EventCard>

  filters: any = {}; // To store filters
  searchQuery: string = ''; // To store search input

  eventTypesEventsFilter: string[] = [];
  locationsEventsFilter: string[] = [];

  ///////////////////////////////////////////////////////

  constructor(private eventService: EventsService,
              private dialog: MatDialog) {}

  ngOnInit() {
    this.continueButtonClicked.emit(false);
    this.selectedEventCardEventEmitter.emit(null);
    const element = document.querySelector('mat-sidenav-content') || window;
    element.scrollTo({
      top: 0,
      behavior: 'smooth' // smooth scrolling
    });

    this.loadEventsFilterEventTypes();
    this.loadEventsFilterLocations();
  }

  onEventSelected(eventCard: EventCard) {
    this.selectedEventCard = eventCard;
  }

  onContinueButtonClicked() {
    this.selectedEventCardEventEmitter.emit(this.selectedEventCard);
    this.continueButtonClicked.emit(true) 
  }

  // Handle when filters are applied
  handleFiltersChanged(filters: any): void {
    this.filters = filters;
  }

  // Handle when filters are reset
  handleFiltersReset(): void {
    this.filters = {}; // Reset filters
  }

  // Handle search input
  handleSearch(searchValue: string): void {
    this.searchQuery = searchValue;
  }

  private loadEventsFilterEventTypes() {
    this.eventService.getAllUniqueEventTypesForEvents().subscribe({
      next: (eventTypes) => {
        this.eventTypesEventsFilter = eventTypes;
      },
      error: () => {
        this.dialog.open(ErrorDialogComponent, {
          data : {
            title: "Error!",
            message: "Error while loading events filter event types"
          }
        });
      }
    }); 
  }
  
  private loadEventsFilterLocations() {
    this.eventService.getAllUniqueLocationsForEvents().subscribe({
      next: (locations) => {
        this.locationsEventsFilter = locations;
      },
      error: () => {
        this.dialog.open(ErrorDialogComponent, {
          data : {
            title: "Error!",
            message: "Error while loading events filter locations"
          }
        });
      }
    });
  }
}
