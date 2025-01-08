import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isEventsSelected : boolean = true;
  currentTab: number = 1;

  filters: any = {}; // To store filters
  searchQuery: string = ''; // To store search input

  ///////////////////////////////////////////////////////

  switchTab(tab: number) : void { 
    if (this.currentTab === 1 && tab === 2) {
      this.currentTab = 2;
      this.isEventsSelected = !this.isEventsSelected;
    }

    if (this.currentTab === 2 && tab === 1) {
      this.currentTab = 1;
      this.isEventsSelected = !this.isEventsSelected;
    }
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
}
  