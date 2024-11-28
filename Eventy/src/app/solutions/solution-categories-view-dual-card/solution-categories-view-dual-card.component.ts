import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SolutionCategoryInputDialogComponent } from '../../shared/solution-category-input-dialog/solution-category-input-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CategoryWithId } from '../model/category-with-id.model';
import { SolutionCategoryService } from '../services/solutions/solution-category.service';
import { YesNoInputDialogComponent } from '../../shared/yes-no-input-dialog/yes-no-input-dialog.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-solution-categories-view-dual-card',
  templateUrl: './solution-categories-view-dual-card.component.html',
  styleUrl: './solution-categories-view-dual-card.component.css'
})
export class SolutionCategoriesViewDualCardComponent {
  @Input()
  categoryDouble: CategoryWithId[];
  
  @Output()
  categoryDeleted: EventEmitter<CategoryWithId> = new EventEmitter<CategoryWithId>();

  @Output()
  categoryEdited: EventEmitter<CategoryWithId> = new EventEmitter<CategoryWithId>();

  constructor(private editDialog: MatDialog, private deleteDialog: MatDialog, private categoriesService: SolutionCategoryService) {

  }

  editCategory(category: CategoryWithId, cardIndex: number) {
    let dialogRef = this.editDialog.open(SolutionCategoryInputDialogComponent, {
      data: {
        message: `Edit category: ${category.name}`,
        categoryId: category.id,
        categoryName: category.name,
        categoryDescription: category.description,
        categoryStatus: category.status
      }
    })

    dialogRef.afterClosed().subscribe(returnValues => {
      if (returnValues[0]) {
        //let updatedEntity: Observable<CategoryWithId> = this.categoriesService.update(returnValues[1])
        //TODO: Uncomment later once backend is implemented
        let updatedEntity: Observable<CategoryWithId> = new Observable(observer => {observer.next(returnValues[1]); observer.complete()});
        updatedEntity.subscribe((updatedEntityValue: CategoryWithId) => {
          this.categoryDouble[cardIndex] = updatedEntityValue;
          this.categoryEdited.emit(updatedEntityValue);
        })
      }
    })
  }

  deleteCategory(category: CategoryWithId) {
    let dialogRef = this.deleteDialog.open(YesNoInputDialogComponent, {
      data: { message: `Are you sure you want to delete the category ${category.name}?`}
    });

    dialogRef.afterClosed().subscribe(doDelete => {
      if (doDelete) {
        this.categoriesService.delete(category.id);
        this.categoryDeleted.emit(category)
      }
    })

  }
}
