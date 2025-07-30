import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SolutionCategoryService } from '../services/solutions/solution-category.service';
import { CategoryWithId } from '../model/category-with-id.model';
import { PageEvent } from '@angular/material/paginator';
import { Status } from '../model/category.model';
import { PagedResponse } from '../../shared/model/paged-response.model';

interface DeletedRequestAndReplacementId {
  deniedRequest: CategoryWithId,
  newRequestId: number
}

@Component({
  selector: 'app-solution-category-requests-view',
  templateUrl: './solution-category-requests-view.component.html',
  styleUrl: './solution-category-requests-view.component.css'
})
export class SolutionCategoryRequestsViewComponent {
  paginatedRequests: CategoryWithId[];
  requestsPairs: CategoryWithId[][] = [];

  totalElements: number = 0;
  pageSize: number = 10;
  currentPage: number = 0;
  
  constructor(private categoryService: SolutionCategoryService) {
    this.updatePaginatedCategories();
  }

  ngOnInit(): void {
    this.updatePaginatedCategories();
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedCategories();
  }

  private updatePaginatedCategories(): void {
    this.categoryService.getAllRequests().subscribe({
      next: (request: PagedResponse<CategoryWithId>) => {
        this.paginatedRequests = request.content;
        this.totalElements = request.totalElements;
        this.requestsPairs = []
        for (let i = 0; i < this.paginatedRequests.length / 2; i++) {
          this.requestsPairs.push([this.paginatedRequests[i*2], this.paginatedRequests[i*2 + 1]])
        }
      }
    })
    
  }

  requestChanged(request: CategoryWithId) {
    // CONSIDER: how to notify PUPs that it has been changed
    request.status = Status.ACCEPTED;
    this.categoryService.changeRequest(request).subscribe({
      next: (response: CategoryWithId) => {
        this.updatePaginatedCategories();
      }
    })
  }

  requestApproved(request: CategoryWithId) {
    request.status = Status.ACCEPTED;
    this.categoryService.acceptRequest(request.id).subscribe({
      next: (response: CategoryWithId) => {
        this.updatePaginatedCategories();
      }
    });

  }

  requestDeniedAndChanged(params: DeletedRequestAndReplacementId) {
    this.categoryService.replaceRequest(params.deniedRequest.id, params.newRequestId).subscribe({
      next: (response: CategoryWithId) => {
        this.updatePaginatedCategories();
      }
    });
  }
}
