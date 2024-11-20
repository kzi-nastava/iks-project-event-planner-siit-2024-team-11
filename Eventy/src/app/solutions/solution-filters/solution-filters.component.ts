import { Component } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChangeDetectionStrategy} from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-solution-filters',
  templateUrl: './solution-filters.component.html',
  styleUrl: './solution-filters.component.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolutionFiltersComponent {
  typeValue: string = "option1";

  solutionCategories = new FormControl('');
  solutionCategoryValue: string = "Food";
  
  eventTypes = new FormControl('');
  eventTypesValue: string = "Wedding";

  companyControl = new FormControl('');
  companyOptions: string[] = ['B.G. DOO', 'M&M DOO', 'VIT DOO', 'H&M', 'Apple', 'Samsung'];
  filteredLCompanyOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredLCompanyOptions = this.companyControl.valueChanges.pipe(
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
}
