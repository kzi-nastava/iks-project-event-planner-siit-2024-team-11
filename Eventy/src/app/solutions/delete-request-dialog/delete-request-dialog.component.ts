import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryWithId } from '../model/category-with-id.model';
import { SolutionCategoryService } from '../services/solutions/solution-category.service';

interface DeleteRequestDialogData {
  categoryName: string
}

@Component({
  selector: 'app-delete-request-dialog',
  templateUrl: './delete-request-dialog.component.html',
  styleUrl: './delete-request-dialog.component.css'
})
export class DeleteRequestDialogComponent {
  public categories: CategoryWithId[] = [];
  public categoryName: string = '';
  public replacementCategory: CategoryWithId;

  constructor(public dialogRef: MatDialogRef<DeleteRequestDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DeleteRequestDialogData, private categoriesService: SolutionCategoryService) {
    this.categoryName = data.categoryName
    this.populateSelectBox()
  }

  populateSelectBox() {
    this.categoriesService.getAll().subscribe(values => {
      this.categories = values;
    })
  }

  closeDialog(): void {
    this.dialogRef.close([false, null]);
  }

  saveInput(): void {
    this.dialogRef.close([true, this.replacementCategory.id])
  }

}
