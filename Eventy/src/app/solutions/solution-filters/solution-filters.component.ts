import {Component, inject} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ChangeDetectionStrategy} from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDateRangeInput } from '@angular/material/datepicker';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-solution-filters',
  templateUrl: './solution-filters.component.html',
  styleUrl: './solution-filters.component.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolutionFiltersComponent {
  private _snackBar = inject(MatSnackBar);

  // filter values
  type: string = "Any";

  solutionCategories = new FormControl('');
  
  eventTypes = new FormControl('');
  eventTypesValue: string = "Wedding";

  company = new FormControl('');
  companyOptions: string[] = ['B.G. DOO', 'M&M DOO', 'VIT DOO', 'H&M', 'Apple', 'Samsung'];
  filteredLCompanyOptions: Observable<string[]>;

  minPrice: number = null;
  maxPrice: number = null;

  dateRangeForm: FormGroup;

  isAvailable: boolean = true;
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
    this.filteredLCompanyOptions = this.company.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.companyOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

  filterSolutions(): void {
    const { start, end } = this.dateRangeForm.get('dateRange')?.value;
    const startDate = start;
    const endDate = end;

    const message: string = "FILTER:\n" +
                   "Type: " + this.type + ";   " + 
                   "Solutions: " + this.solutionCategories.value + ";   " +
                   "Event types: " + this.eventTypes.value + ";   " +
                   "Company: " + this.company.value + ";   " +
                   "Min price: " + this.minPrice + ";   " +
                   "Max price: " + this.maxPrice + ";   " +
                   "Date start: " + startDate + ";   " +
                   "Date end: " + endDate + ";  " + 
                   "Availability: " + this.isAvailable;

    this._snackBar.open(message, "OK!");
  }

  resetFilters(): void {
    this.type = "Any";
    this.solutionCategories = new FormControl('');
    this.eventTypes = new FormControl('');
    this.company = new FormControl('');
    this.minPrice = null;
    this.maxPrice = null;
    this.dateRangeForm.get('dateRange')?.reset();
    this.isAvailable = true;
  }
}
