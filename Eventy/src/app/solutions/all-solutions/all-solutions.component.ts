import { Component, Input, SimpleChanges } from '@angular/core';
import { SolutionCard } from '../model/solution-card.model';
import { ViewEncapsulation } from '@angular/core';
import { SolutionsService } from '../services/solutions/solutions-service.service';
import { PagedResponse } from '../../shared/model/paged-response.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-all-solutions',
  templateUrl: './all-solutions.component.html',
  styleUrl: './all-solutions.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class AllSolutionsComponent {
  // "all" solutions
  paginatedSolutions: SolutionCard[] = [];

  // pageable
  pageEvent: PageEvent;
  pageSize: number = 5;
  currentPage: number = 0;
  totalCount: number = 100;

  // filter, sort and search 
  sortValue: string = "category";
  @Input() searchQuery: string = ''; // from home.ts component
  @Input() filters: any = {}; // from home.ts component

  constructor(private solutionsService: SolutionsService) {}

  ngOnInit(): void {
    this.updatePaginatedSolutions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filters'] || changes['searchQuery']) {
      this.updatePaginatedSolutions();
    }
  }

  public onPageChange(event?: PageEvent){
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedSolutions();
  }

   private updatePaginatedSolutions(): void {
    const params = { search: this.searchQuery, ...this.filters,};
  
    this.solutionsService.getAllSolutions(
      { page: this.currentPage, pageSize: this.pageSize, sort: this.sortValue }, // Pagination and sort params
      params
    ).subscribe({
      next: (response: PagedResponse<SolutionCard>) => {
        this.paginatedSolutions = response.content;
        this.totalCount = response.totalElements;
      },
      error: (err) => {
        console.error('Failed to fetch solutions:', err);
      },
    });
  }

  onSearchInput(): void {
    this.currentPage = 0;
    this.updatePaginatedSolutions();
  }

  applySearchAndFilters(): void {
    this.currentPage = 0;
    this.updatePaginatedSolutions();
  }

  onSortChange(event: any): void {
    this.sortValue = event.value;    
    this.updatePaginatedSolutions();
  }

  isService(solutionCard: SolutionCard): boolean {
    return (solutionCard.type === "SERVICE");
  }

  isProduct(solutionCard: SolutionCard): boolean {
    return (solutionCard.type === "PRODUCT");
  }
}
