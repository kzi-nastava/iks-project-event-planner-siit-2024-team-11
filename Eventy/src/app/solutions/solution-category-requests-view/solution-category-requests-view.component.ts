import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SolutionCategoryService } from '../services/solutions/solution-category.service';
import { CategoryWithId } from '../model/category-with-id.model';
import { PageEvent } from '@angular/material/paginator';
import { Status } from '../model/category.model';

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
  requests: CategoryWithId[] = [];
  paginatedRequests: CategoryWithId[];
  requestsPairs: CategoryWithId[][] = [];

  private pageSize: number;
  private currentPage: number;
  
  constructor(private creationDialog: MatDialog, private categoryService: SolutionCategoryService) {
    this.updatePaginatedCategories();
  }

  ngOnInit(): void {
    this.pageSize = 10;
    this.currentPage = 0;
    this.getAll();
    this.updatePaginatedCategories();
  }

  getAll(): void {
    this.categoryService.getAllRequests().subscribe({
      next: (request: CategoryWithId[]) => {
        this.requests = request;
      }
    })
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedCategories();
  }

  private updatePaginatedCategories(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedRequests = this.requests.slice(startIndex, endIndex);
    this.requestsPairs = []
    for (let i = 0; i < this.paginatedRequests.length / 2; i++) {
      this.requestsPairs.push([this.paginatedRequests[i*2], this.paginatedRequests[i*2 + 1]])
    }
  }

  requestChanged(request: CategoryWithId) {
    // CONSIDER: how to notify PUPs that it has been changed
    request.status = Status.ACCEPTED;
    this.categoryService.update(request);
    this.removeFromRequestListAndUpdatePage(request)
  }

  requestApproved(request: CategoryWithId) {
    request.status = Status.ACCEPTED;
    this.categoryService.update(request);
    this.removeFromRequestListAndUpdatePage(request)
  }

  requestDeniedAndChanged(params: DeletedRequestAndReplacementId) {
    // TODO: change every solution with oldRequest.id as a category with newRequestId (REST call)
    this.categoryService.delete(params.deniedRequest.id);
    this.removeFromRequestListAndUpdatePage(params.deniedRequest)
  }


  removeFromRequestListAndUpdatePage(request: CategoryWithId): void {
    let index: number = this.requests.findIndex(r => request.id === r.id)
    if (index > -1) {
      this.requests.splice(index, 1);
    }
    this.updatePaginatedCategories();
  }
}
