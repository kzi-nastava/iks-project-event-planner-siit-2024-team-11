import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CategoryWithId } from '../../solutions/model/category-with-id.model';
import { Status } from '../../solutions/model/category.model';
import { SolutionCategoryService } from '../../solutions/services/solutions/solution-category.service';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';
import { BudgetService } from '../services/budget-service.service';
import { BudgetItem } from '../model/budget.model';

export interface BudgetMenuCategoryInputDialogData {
  eventId: number
}

@Component({
  selector: 'app-budget-menu-category-input-dialog',
  templateUrl: './budget-menu-category-input-dialog.component.html',
  styleUrl: './budget-menu-category-input-dialog.component.css'
})
export class BudgetMenuCategoryInputDialogComponent {
  
  budgetItemForm: FormGroup = new FormGroup({
    category: new FormControl(null, [Validators.required]),
    allocatedFunds: new FormControl(null, [Validators.required, Validators.min(0)])
  });
  
  remainingSolutionCategories: CategoryWithId[] = [{id: -1, name: "null", description: "null", status: Status.DENIED}]
  noMoreCategories: boolean = false;

  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<BudgetMenuCategoryInputDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: BudgetMenuCategoryInputDialogData,
              private solutionCateogryService: SolutionCategoryService, private budgetService: BudgetService) {

  }

  ngOnInit() {
    this.fetchCategories()
  }

  fetchCategories(): void {
    this.solutionCateogryService.getAllRemaining(this.data.eventId).subscribe({
      next: (response: CategoryWithId[]) => {
        this.remainingSolutionCategories = response;

        if (this.remainingSolutionCategories.length === 0) {
          this.noMoreCategories = true
        }
      },
      error: (err: any) => {
        this.dialog.open(ErrorDialogComponent, {
          width: '400px',
          disableClose: true, // prevents closing by clicking outside
          backdropClass: 'blurred_backdrop_dialog',
          data: {
            title: 'Error',
            message: 'Error loading categories!',
          },
        });
      }
    })
  }

  submit(): void {
    if (this.budgetItemForm.valid) {
      this.budgetService.createBudgetItem(this.data.eventId, this.budgetItemForm.get('category').value, this.budgetItemForm.get('allocatedFunds').value).subscribe({
        next: (response: BudgetItem) => {
          this.dialogRef.close([true, response])
        },
        error: (err: any) => {
          this.dialog.open(ErrorDialogComponent, {
          width: '400px',
          disableClose: true, // prevents closing by clicking outside
          backdropClass: 'blurred_backdrop_dialog',
          data: {
            title: 'Error',
            message: 'Error creating new budget item!',
          },
        });
        }
      })
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
