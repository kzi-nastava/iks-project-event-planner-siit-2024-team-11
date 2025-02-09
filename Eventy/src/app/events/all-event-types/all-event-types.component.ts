import {Component, OnInit} from '@angular/core';
import {EventType, EventTypeCard, EventTypeWithActivity} from '../model/events.model';
import {EventTypeService} from '../event-type.service';
import {PageEvent} from '@angular/material/paginator';
import {PagedResponse} from '../../shared/model/paged-response.model';
import {ErrorDialogComponent} from '../../shared/error-dialog/error-dialog.component';
import {MatDialog} from '@angular/material/dialog';

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
  selectedEventType: EventTypeWithActivity;
  pageSize: number = 12;
  currentPage: number = 0;
  paginatedEventTypes: EventTypeCard[] = [];
  totalCount: number = 0;

  constructor(private eventTypeService: EventTypeService, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.updatePaginatedEventTypes();
  }

  clearSearch(): void {
    this.searchQuery = "";
  }

  selectType(eventType: EventTypeCard): void {
    if(this.selectedEventType && this.selectedEventType.id === eventType.id) {
      this.selectedEventType = null;
    } else {
      this.eventTypeService.get(eventType.id).subscribe({
        next: (response: EventTypeWithActivity) => {
          this.selectedEventType = response;
        }
      });
    }
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

  getCardClasses(eventType: EventTypeCard): ICardClasses {
    return {
      "event-type-card" : true,
      "selected-card": this.selectedEventType && this.selectedEventType.id === eventType.id
    }
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedEventTypes();
  }

  private updatePaginatedEventTypes(): void {
    this.eventTypeService.getEventTypes(this.searchQuery, {
      page: this.currentPage,
      size: this.pageSize,
    })
      .subscribe( {
        next: (response: PagedResponse<EventTypeCard>) => {
          this.paginatedEventTypes = response.content;
          this.totalCount = response.totalElements;
        }
      });
  }

  search(): void {
    this.currentPage = 0;
    this.updatePaginatedEventTypes();
  }

  toggleActivate(): void {
    this.eventTypeService.toggleActivate(this.selectedEventType.id).subscribe({
      next: (response: EventType) => {
        this.updatePaginatedEventTypes();

        this.eventTypeService.get(this.selectedEventType.id).subscribe({
          next: (response: EventTypeWithActivity) => {
            console.log(response);
            this.selectedEventType = response;
          }
        });
      },
      error: () => {
        this.dialog.open(ErrorDialogComponent, {
          width: '400px',
          disableClose: true,
          backdropClass: 'blurred_backdrop_dialog',
          data: {
            title: "Deactivation unsuccessful",
            message: 'You can\'t deactivate an event type that is in use!',
          },
        });
      }
    });
  }
}
