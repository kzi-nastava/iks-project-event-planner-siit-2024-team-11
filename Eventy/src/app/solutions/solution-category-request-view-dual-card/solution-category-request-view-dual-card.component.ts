import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryWithId } from '../model/category-with-id.model';
import { Observable } from 'rxjs';
import { YesNoInputDialogComponent } from '../../shared/yes-no-input-dialog/yes-no-input-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SolutionCategoryService } from '../services/solutions/solution-category.service';
import { SolutionCategoryInputDialogComponent } from '../../shared/solution-category-input-dialog/solution-category-input-dialog.component';
import { DeleteRequestDialogComponent } from '../delete-request-dialog/delete-request-dialog.component';

@Component({
  selector: 'app-solution-category-request-view-dual-card',
  templateUrl: './solution-category-request-view-dual-card.component.html',
  styleUrl: './solution-category-request-view-dual-card.component.css'
})
export class SolutionCategoryRequestViewDualCardComponent {
  @Input()
  categoryDouble: CategoryWithId[];
  
  @Output()
  requestDeniedAndChanged: EventEmitter<{deniedRequest: CategoryWithId, newRequestId: number}> = new EventEmitter<{deniedRequest: CategoryWithId, newRequestId: number}>();

  @Output()
  requestChanged: EventEmitter<CategoryWithId> = new EventEmitter<CategoryWithId>();

  @Output()
  requestApproved: EventEmitter<CategoryWithId> = new EventEmitter<CategoryWithId>();

  constructor(private editDialog: MatDialog, private deleteDialog: MatDialog) {

  }

  approveRequest(request: CategoryWithId) {
    let dialogRef = this.deleteDialog.open(YesNoInputDialogComponent, {
      data: { message: `Are you sure you want to approve the request ${request.name}?`}
    });

    dialogRef.afterClosed().subscribe(doApprove => {
      if (doApprove) {
        //this.categoriesService.delete(category.id);
        this.requestApproved.emit(request)
      }
    })
  }

  editRequest(category: CategoryWithId, cardIndex: number) {
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
        let updatedEntity: Observable<CategoryWithId> = new Observable(observer => {observer.next(returnValues[1]); observer.complete()});
        updatedEntity.subscribe((updatedEntityValue: CategoryWithId) => {
          this.categoryDouble[cardIndex] = updatedEntityValue;
          this.requestChanged.emit(updatedEntityValue);
        })
      }
    })
  }

  deleteRequestAndPickNew(category: CategoryWithId) {
    let dialogRef = this.deleteDialog.open(DeleteRequestDialogComponent, {
      data: { categoryName: category.name }
    });

    dialogRef.afterClosed().subscribe(values => {
      if (values[0]) {
        this.requestDeniedAndChanged.emit({
          deniedRequest: category,
          newRequestId: values[1]
        })
      }
    })

  }
}
