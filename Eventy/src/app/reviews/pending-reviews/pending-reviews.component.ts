import { Component } from '@angular/core';
import { Review } from '../model/review.model';
import { ReviewService } from '../service/review.service';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { PagedResponse } from '../../shared/model/paged-response.model';

@Component({
  selector: 'app-pending-reviews',
  templateUrl: './pending-reviews.component.html',
  styleUrl: './pending-reviews.component.css'
})
export class PendingReviewsComponent {
  paginatedPendingReviews: Review[] = [];
  pageEvent: PageEvent;
  pageSize: number = 5;
  currentPage: number = 0;
  totalCount: number = 100;

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.updatePaginatedReviews();
  }

  public onPageChange(event?: PageEvent){
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedReviews();
  }

  private updatePaginatedReviews(): void {
    this.reviewService.getAllPendingReviews(
      { page: this.currentPage, size: this.pageSize },
    ).subscribe({
      next: (response: PagedResponse<Review>) => {
        this.paginatedPendingReviews = response.content;
        this.totalCount = response.totalElements;
      },
      error: (err) => {
        console.error('Failed to fetch events:', err);
      },
    });
  }
}
