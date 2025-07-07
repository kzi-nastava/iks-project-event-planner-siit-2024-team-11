import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';

export interface BudgetMenuCategoryEditDialogData {
  categoryName: string,
  oldAllocatedFunds: number
}

@Component({
  selector: 'app-budget-menu-category-edit-dialog',
  templateUrl: './budget-menu-category-edit-dialog.component.html',
  styleUrl: './budget-menu-category-edit-dialog.component.css'
})
export class BudgetMenuCategoryEditDialogComponent {
  budgetItemForm: FormGroup = new FormGroup({
      allocatedFunds: new FormControl(null, [Validators.required, Validators.min(0)])
  });
    constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<BudgetMenuCategoryEditDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: BudgetMenuCategoryEditDialogData) {
                  this.budgetItemForm.get('allocatedFunds').setValue(this.data.oldAllocatedFunds);
    }
  
    submit(): void {
      if (this.budgetItemForm.valid) {
        this.dialogRef.close([true, this.budgetItemForm.get('allocatedFunds').value])
      } else {
        this.dialog.open(ErrorDialogComponent, {
          width: '400px',
          disableClose: true,
          backdropClass: 'blurred_backdrop_dialog',
          data: {
            title: 'Input Error',
            message: 'Please make sure that all inputs are valid.',
          },
        });
      }
    }
  
    closeDialog(): void {
      this.dialogRef.close([false, null]);
    }
}
