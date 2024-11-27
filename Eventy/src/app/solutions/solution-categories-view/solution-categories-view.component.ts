import { Component } from '@angular/core';
import { Status } from '../model/category.model';
import { SolutionCategoryService } from '../services/solutions/solution-category.service';
import { Observable } from 'rxjs';
import { CategoryWithId } from '../model/category-with-id.model';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { SolutionCategoryInputDialogComponent } from '../../shared/solution-category-input-dialog/solution-category-input-dialog.component';

@Component({
  selector: 'app-solution-categories-view',
  templateUrl: './solution-categories-view.component.html',
  styleUrl: './solution-categories-view.component.css'
})
export class SolutionCategoriesViewComponent {
  categories: CategoryWithId[] = [];

 paginatedCategories: CategoryWithId[];
 categoryPairs: CategoryWithId[][] = []
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
    this.categoryService.getAll().subscribe({
      next: (category: CategoryWithId[]) => {
        this.categories = category;
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
    this.paginatedCategories = this.categories.slice(startIndex, endIndex);
    this.categoryPairs = []
    for (let i = 0; i < this.paginatedCategories.length / 2; i++) {
      this.categoryPairs.push([this.paginatedCategories[i*2], this.paginatedCategories[i*2 + 1]])
    }
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
        //let updatedEntity: Observable<CategoryWithId> = this.categoriesService.create(returnValues[1])
        //TODO: Uncomment later once backend is implemented
        let createdEntity: Observable<CategoryWithId> = new Observable(observer => {observer.next(returnValues[1]); observer.complete()});
        createdEntity.subscribe((createdEntityValue: CategoryWithId) => {
            this.categoryService.create(createdEntityValue)
            this.categories.push(createdEntityValue)
        })
      }
    })
  }

  categoryDeleted(category: CategoryWithId) {
    let index: number = this.categories.indexOf(category);
    if (index > -1) {
      this.categories.splice(index, 1);
    }
    this.updatePaginatedCategories();
  }

  categoryEdited(category: CategoryWithId) {
    let index: number = this.categories.findIndex(v => category.id === v.id)
    if (index > -1) {
      this.categories[index] = category;
    }
    this.updatePaginatedCategories();
  }
}
