import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Status } from '../../solutions/model/category.model';
import { CategoryWithId } from '../../solutions/model/category-with-id.model';
import { SolutionCategoryService } from '../../solutions/services/solutions/solution-category.service';

interface SolutionCategoryInputDialogData {
  message: string;
  categoryId: number;
  categoryName: string;
  categoryDescription: string;
  categoryStatus: Status;
}

@Component({
  selector: 'app-solution-category-input-dialog',
  templateUrl: './solution-category-input-dialog.component.html',
  styleUrl: './solution-category-input-dialog.component.css'
})
export class SolutionCategoryInputDialogComponent {
  message: string = ''
  categoryId: number = null;
  categoryName: string = '';
  categoryDescription: string = '';
  categoryStatus: Status = Status.PENDING;

  constructor(public dialogRef: MatDialogRef<SolutionCategoryInputDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: SolutionCategoryInputDialogData, private categoriesService: SolutionCategoryService) {
    this.categoryId = data.categoryId;
    this.categoryName = data.categoryName;
    this.categoryDescription = data.categoryDescription;
    this.categoryStatus = data.categoryStatus;
    this.message = data.message;  
  }

  closeDialog(): void {
    this.dialogRef.close([false, null]);
  }

  saveInput(): void {
    let updatedCategory: CategoryWithId = {
      id: this.categoryId,
      name: this.categoryName,
      description: this.categoryDescription,
      status: this.categoryStatus
    };
    this.dialogRef.close([true, updatedCategory])
  }

}
