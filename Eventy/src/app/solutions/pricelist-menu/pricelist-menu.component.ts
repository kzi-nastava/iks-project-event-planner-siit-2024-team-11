import { Component } from '@angular/core';
import { PricelistItem } from '../model/pricelist-item.model';
import { PageEvent } from '@angular/material/paginator';
import { SolutionsService } from '../services/solutions/solutions-service.service';
import { PagedResponse } from '../../shared/model/paged-response.model';

@Component({
  selector: 'app-pricelist-menu',
  templateUrl: './pricelist-menu.component.html',
  styleUrl: './pricelist-menu.component.css',
})
export class PricelistMenuComponent {

  items: PricelistItem[] = [];
  totalElements: number = 0;
  pageSize: number = 10;
  currentPage: number = 0;

  constructor(private solutionsService: SolutionsService) {}

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems(): void {
    this.solutionsService.getPricelist({page: this.currentPage, size: this.pageSize}).subscribe({
      next: (response: PagedResponse<PricelistItem>) => {
        console.log(response.content)
        this.items = response.content;
        this.totalElements = response.totalElements;
      }
    })
  }

  onPageChange(event: PageEvent): void {
      this.pageSize = event.pageSize;
      this.currentPage = event.pageIndex;
      this.fetchItems()
  }
}
