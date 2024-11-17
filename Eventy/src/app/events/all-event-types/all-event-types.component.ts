import {Component, OnInit} from '@angular/core';
import {IEventType} from '../model/events.model';
import {EventTypeService} from '../event-type.service';
import {PageEvent} from '@angular/material/paginator';

interface ICardClasses {
  "event-type-card": boolean,
  "selected-card": boolean
}
@Component({
  selector: 'app-all-event-types',
  templateUrl: './all-event-types.component.html',
  styleUrl: './all-event-types.component.css'
})
export class AllEventTypesComponent implements OnInit {
  searchQuery: string = "";
  eventTypes: IEventType[] = [];
  selectedEventType: IEventType;
  pageSize: number = 12;
  currentPage: number = 0;
  paginatedEventTypes: IEventType[] = [];

  constructor(private eventTypeService: EventTypeService) {

  }

  ngOnInit(): void {
    this.eventTypes = this.eventTypeService.getAll();

    this.updatePaginatedEventTypes();
  }

  clearSearch(): void {
    this.searchQuery = "";
  }

  selectType(eventType: IEventType): void {
    this.selectedEventType = eventType;
  }

  getItemsTypesAsTriplets<T>(items: T[]): [T, T, T][] {
    let eventTypeTriplets: [T, T, T][] = [];

    let curIndex: number = 0;
    let triplet: [T, T, T] = [null, null, null];
    for(let eventType of items) {
      triplet[curIndex++ % 3] = eventType;

      if(curIndex % 3 == 0) {
        eventTypeTriplets.push(triplet);
        triplet = [null, null, null];
      }
    }

    if(triplet[0]) {
      eventTypeTriplets.push(triplet);
    }

    return eventTypeTriplets;
  }

  filterTriplet<T>(triplet: [T, T, T]): T[] {
    if(!triplet[1]) {
      return [triplet[0]];
    } else if(!triplet[2]) {
      return [triplet[0], triplet[1]];
    }

    return triplet;
  }

  getCardClasses(eventType: IEventType): ICardClasses {
    return {
      "event-type-card" : true,
      "selected-card": this.selectedEventType && this.selectedEventType.name === eventType.name
    }
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedEventTypes();
  }

  private updatePaginatedEventTypes(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedEventTypes = this.eventTypes.slice(startIndex, endIndex);
  }

  search(): void {
    this.eventTypes = this.eventTypeService.search(this.searchQuery);
    this.updatePaginatedEventTypes();
  }

  deleteType(): void {
    this.eventTypeService.delete(this.selectedEventType);
    this.eventTypes = this.eventTypeService.getAll();
    this.updatePaginatedEventTypes();
  }
}
