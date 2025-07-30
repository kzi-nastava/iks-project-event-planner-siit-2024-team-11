import { Component } from '@angular/core';
import { Status } from '../model/category.model';
import { SolutionCategoryService } from '../services/solutions/solution-category.service';
import { Observable } from 'rxjs';
import { CategoryWithId } from '../model/category-with-id.model';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { SolutionCategoryInputDialogComponent } from '../../shared/solution-category-input-dialog/solution-category-input-dialog.component';
import { PageProperties } from '../../shared/model/page-properties.model';
import { PagedResponse } from '../../shared/model/paged-response.model';

@Component({
  selector: 'app-solution-categories-view',
  templateUrl: './solution-categories-view.component.html',
  styleUrl: './solution-categories-view.component.css'
})
export class SolutionCategoriesViewComponent {
  totalElements: number = 0;
  pageSize: number = 10;
  currentPage: number = 0;
  
  paginatedCategories: CategoryWithId[] = [];
  categoryPairs: CategoryWithId[][] = []
  
  constructor(private creationDialog: MatDialog, private categoryService: SolutionCategoryService) {
    
  }

  ngOnInit(): void {
    this.currentPage = 0;
    this.updatePaginatedCategories();
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedCategories();
  }

  updatePaginatedCategories(): void {
    let pageProperties: PageProperties = {page: this.currentPage, size: this.pageSize};
    this.categoryService.getAllPaginated(pageProperties).subscribe({
      next: (category: PagedResponse<CategoryWithId>) => {
        this.paginatedCategories = category.content;
        this.totalElements = category.totalElements;
        this.categoryPairs = [];
        for (let i = 0; i < this.paginatedCategories.length / 2; i++) {
          this.categoryPairs.push([this.paginatedCategories[i*2], this.paginatedCategories[i*2 + 1]])
        }
      }
    })
    
  }

  addCategory() {
    let dialogRef = this.creationDialog.open(SolutionCategoryInputDialogComponent, {
      data: {
        message: "Create new category",
        categoryName: '',
        categoryDescription: '',
        categoryStatus: Status.ACCEPTED
      }
    })

    dialogRef.afterClosed().subscribe(returnValues => {
      if (returnValues[0]) {
        let createdEntity: Observable<CategoryWithId> = this.categoryService.create(returnValues[1])
        
        createdEntity.subscribe((createdEntityValue: CategoryWithId) => {
            this.updatePaginatedCategories();
        })
      }
    })
  }

  categoryDeleted(category: CategoryWithId) {
    this.categoryService.delete(category.id)
    this.updatePaginatedCategories();
  }

  categoryEdited(category: CategoryWithId) {
    this.categoryService.update(category).subscribe({
      next: (updatedCategory: CategoryWithId) => {
        this.updatePaginatedCategories();
      }
    })
  }
}
