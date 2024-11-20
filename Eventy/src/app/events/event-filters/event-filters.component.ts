import { Component } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChangeDetectionStrategy} from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-event-filters',
  templateUrl: './event-filters.component.html',
  styleUrl: './event-filters.component.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventFiltersComponent {
  eventTypes = new FormControl('');
  eventTypeValue: string = "Wedding";

  locationControl = new FormControl('');
  locationOptions: string[] = ['Belgrade', 'Gradiska', 'Novi Sad', 'Paris', 'New York', 'Kuala Lumpur'];
  filteredLocationOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredLocationOptions = this.locationControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.locationOptions.filter(option => option.toLowerCase().includes(filterValue));
  }
}
