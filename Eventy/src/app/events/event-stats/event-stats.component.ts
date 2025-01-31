import {ChangeDetectionStrategy, Component, OnInit, SimpleChanges} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {EventsService} from '../services/events/events-service.service';
import {PagedResponse} from '../../shared/model/paged-response.model';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {provideNativeDateAdapter} from '@angular/material/core';
import {EventStats} from '../model/events.model';
import {ErrorDialogComponent} from '../../shared/error-dialog/error-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-event-stats',
  templateUrl: './event-stats.component.html',
  styleUrl: './event-stats.component.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventStatsComponent {
  // "all" events
  paginatedEvents: EventStats[] = [];

  // pageable
  pageSize: number = 5;
  currentPage: number = 0;
  totalCount: number = 100;

  // filter, sort and search
  sortValue: string = "type"; // from this component
  searchQuery: string = ''; // from home.ts component
  filters: any = {};

  maxParticipantsValue: number = null;
  eventTypes = new FormControl('');
  locations = new FormControl('');
  locationOptions: string[] = ['Belgrade', 'Gradiska', 'Novi Sad', 'Paris', 'New York', 'Kuala Lumpur'];
  filteredLocationOptions: Observable<string[]>;
  dateRangeForm: FormGroup;

  //////////////////////////////////////

  constructor(private eventsService: EventsService, private fb: FormBuilder, private dialog: MatDialog) {
    this.dateRangeForm = this.fb.group({
      dateRange: this.fb.group({
        start: [''],
        end: [''],
      }),
    });

    this.updatePaginatedEvents();
  }

  ngOnInit(): void {
    this.filteredLocationOptions = this.locations.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
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

    this.eventsService.getEventsWithStats(
      { page: this.currentPage, pageSize: this.pageSize, sort: this.sortValue }, // Pagination and sort params
      params
    ).subscribe({
      next: (response: PagedResponse<EventStats>) => {
        this.paginatedEvents = response.content;
        this.totalCount = response.totalElements;
      },
      error: (err) => {
        console.error('Failed to fetch events:', err);
      },
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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.locationOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  filterEvents(): void {
    const { start, end } = this.dateRangeForm.get('dateRange')?.value;

    this.filters = {
      eventTypes: this.eventTypes.value,
      maxParticipants: this.maxParticipantsValue,
      location: this.locations.value,
      startDate: start,
      endDate: end,
    };

    /*
    const message: string = "FILTER:\n" +
                   "Event types: " + this.eventTypes.value + ";   " +
                   "Max Participants: " + this.maxParticipantsValue + ";   " +
                   "Location: " + this.locations.value + ";   " +
                   "Date start: " + startDate + "; " +
                   "Date end: " + endDate;*/
  }

  resetFilters(): void {
    this.maxParticipantsValue = null;
    this.eventTypes.setValue('');
    this.locations.setValue('');
    this.dateRangeForm.get('dateRange')?.reset();
  }

  downloadPDF(eventId: number, name: string): void {
    this.eventsService.triggerEventStatsPDFDownload(eventId).subscribe({
      next: (response: Blob) => {
        const blob: Blob = new Blob([response], { type: 'application/pdf' });
        const url: string = window.URL.createObjectURL(blob);
        const anchor: HTMLAnchorElement = document.createElement('a');
        anchor.href = url;
        anchor.download = name + '-stats.pdf';
        anchor.click();
        window.URL.revokeObjectURL(url);
      },
      error: () => {
        this.dialog.open(ErrorDialogComponent, {
          width: '400px',
          disableClose: true, // prevents closing by clicking outside
          backdropClass: 'blurred_backdrop_dialog',
          data: {
            title: "Error while downloading",
            message: 'Error while downloading guest list. Please try again later.',
          },
        });
      }
    });
  }
}
