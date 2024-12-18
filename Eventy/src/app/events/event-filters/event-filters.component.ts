import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {ChangeDetectionStrategy} from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-event-filters',
  templateUrl: './event-filters.component.html',
  styleUrl: './event-filters.component.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventFiltersComponent {
  private _snackBar = inject(MatSnackBar);

  // filter values
  maxParticipantsValue: number = null;

  eventTypes = new FormControl('');

  locations = new FormControl('');
  locationOptions: string[] = ['Belgrade', 'Gradiska', 'Novi Sad', 'Paris', 'New York', 'Kuala Lumpur'];
  filteredLocationOptions: Observable<string[]>;

  dateRangeForm: FormGroup;
  //

  constructor (private fb: FormBuilder) {
    this.dateRangeForm = this.fb.group({
      dateRange: this.fb.group({
        start: [''],
        end: [''],
      }),
    });
  }

  ngOnInit() {
    this.filteredLocationOptions = this.locations.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.locationOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  filterEvents(): void {
    const { start, end } = this.dateRangeForm.get('dateRange')?.value;
    const startDate = start;
    const endDate = end;

    const message: string = "FILTER:\n" +
                   "Event types: " + this.eventTypes.value + ";   " + 
                   "Max Participants: " + this.maxParticipantsValue + ";   " +
                   "Location: " + this.locations.value + ";   " +         
                   "Date start: " + startDate + "; " +
                   "Date end: " + endDate;

    this._snackBar.open(message, "OK!");
  }

  resetFilters(): void {
    this.maxParticipantsValue = null;
    this.eventTypes = new FormControl('');
    this.locations = new FormControl('');
    this.dateRangeForm.get('dateRange')?.reset();
  }
}
