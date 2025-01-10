import { Component, Input, Output, inject, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { EventCard } from '../model/event-card.model';
import { ViewEncapsulation } from '@angular/core';
import { EventsServiceService } from '../services/events/events-service.service';
import {PagedResponse} from '../../shared/model/paged-response.model';
import { PageEvent } from '@angular/material/paginator';

//{ search: 'Jane & Mark Wedding', eventTypes: ['Wedding', 'Party'], location: 'BeachResort', startDate: new Date('2024-05-01T00:00:00'), endDate: new Date('2024-05-01T00:00:00') }
  
/* filters: (from event-filters.ts)
const filters = {
  eventTypes: this.eventTypes.value,
  maxParticipants: this.maxParticipantsValue,
  location: this.locations.value,
  startDate: start,
  endDate: end,
};  
*/

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrl: './all-events.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class AllEventsComponent {
  // "all" events
  paginatedEvents: EventCard[] = [];
  
  // pageable
  pageEvent: PageEvent;
  pageSize: number = 5;
  currentPage: number = 0;
  totalCount: number = 100;

  // filter, sort and search 
  sortValue: string = "type"; // from this component
  @Input() searchQuery: string = ''; // from home.ts component
  @Input() filters: any = {}; // from home.ts component
  
  @Input() isCardClickable: Boolean; // from home.ts component - for reservation-select-event.ts
  selectedEventCard: EventCard = null;

  @Output() clickedEventCardEventEmitter = new EventEmitter<EventCard>; // to reservation-select-event.ts

  //////////////////////////////////////

  constructor(private eventsService: EventsServiceService) {}

  ngOnInit(): void {
     this.updatePaginatedEvents();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filters'] || changes['searchQuery']) {
      this.updatePaginatedEvents();
    }
  }

  public onPageChange(event?: PageEvent){
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedEvents();
  }

  private updatePaginatedEvents(): void {
    const params = { search: this.searchQuery, ...this.filters,};
  
    this.eventsService.getAllEvents(
      { page: this.currentPage, pageSize: this.pageSize, sort: this.sortValue }, // Pagination and sort params
      params
    ).subscribe({
      next: (response: PagedResponse<EventCard>) => {
        this.paginatedEvents = response.content;
        this.totalCount = response.totalElements;
      }
    });
  }

  onSearchInput(): void {
    this.currentPage = 0;
    this.updatePaginatedEvents();
  }

  applySearchAndFilters(): void {
    this.currentPage = 0;
    this.updatePaginatedEvents();
  }

  onSortChange(event: any): void {
    this.sortValue = event.value;    
    this.updatePaginatedEvents();
  }

  handleCardClick(eventCard: EventCard) {
    if (this.isCardClickable) {
      this.selectedEventCard = eventCard; 
      this.clickedEventCardEventEmitter.emit(eventCard);
    }
  }
}
