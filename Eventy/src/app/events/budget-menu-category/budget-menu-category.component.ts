import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BudgetItem } from '../model/budget.model';
import { BudgetService } from '../services/budget-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';
import { BudgetMenuCategoryEditDialogComponent } from '../budget-menu-category-edit-dialog/budget-menu-category-edit-dialog.component';
import { BudgetMenuSolutionSelectionDialogComponent } from '../budget-menu-solution-selection-dialog/budget-menu-solution-selection-dialog.component';

@Component({
  selector: 'app-budget-menu-category',
  templateUrl: './budget-menu-category.component.html',
  styleUrl: './budget-menu-category.component.css'
})
export class BudgetMenuCategoryComponent {

  @Input() eventId: number = -1;
  @Input() eventDate: Date;
  @Input() budgetItem: BudgetItem = {
    id: -1,
    category: '',
    plannedFunds: 0,
    budgetedEntries: []
  };

  totalFunds: number = 0;

  @Output() budgetItemDeleted: EventEmitter<number> = new EventEmitter();

  constructor(private dialog: MatDialog, private budgetService: BudgetService) {
    }

  ngOnInit() {
    this.calculateTotalFunds();
  }

  calculateTotalFunds(): void {
    this.totalFunds = 0;
    for(let solution of this.budgetItem.budgetedEntries) {
      this.totalFunds += (solution.price - (solution.price * solution.discount / 100))
    }
  }

  handleAddItem() {
    let dialogRef = this.dialog.open(BudgetMenuSolutionSelectionDialogComponent, {
      width: 'auto',
      disableClose: false,
      backdropClass: 'blurred_backdrop_dialog',
      data: {
        categoryName: this.budgetItem.category,
        eventId: this.eventId 
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result[0]) {
        this.budgetItem.budgetedEntries.push(result[1])
        this.calculateTotalFunds()
      }
    })
  }

  handleEditFunds() {
    if (this.isEditable()) {
      let dialogRef = this.dialog.open(BudgetMenuCategoryEditDialogComponent, {
        width: '400px',
        disableClose: true,
        backdropClass: 'blurred_backdrop_dialog',
        data: {
          categoryName: this.budgetItem.category,
          oldAllocatedFunds: this.budgetItem.plannedFunds
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result && result[0]) {
          this.budgetService.updateBudgetItemFunds(this.budgetItem.id, result[1]).subscribe({
            next: (value: BudgetItem) => {
              this.budgetItem.plannedFunds = value.plannedFunds;
            },
            error: (err: any) => {
              this.dialog.open(ErrorDialogComponent, {
                width: '400px',
                disableClose: true,
                backdropClass: 'blurred_backdrop_dialog',
                data: {
                  title: 'Error',
                  message: 'Error changing the allocated funds of the budget item!',
                },
              });
            }
          });
        }
      })
    } else {
      this.dialog.open(ErrorDialogComponent, {
        width: '400px',
        disableClose: true, // prevents closing by clicking outside
        backdropClass: 'blurred_backdrop_dialog',
        data: {
          title: 'Error',
          message: 'You cannot delete this category as the event has passed!',
        },
      });
    }
  }

  handleDeleteSelf() {
    if (this.isEditable()) {
      this.budgetItemDeleted.emit(this.budgetItem.id);
    } else {
      this.dialog.open(ErrorDialogComponent, {
        width: '400px',
        disableClose: true, // prevents closing by clicking outside
        backdropClass: 'blurred_backdrop_dialog',
        data: {
          title: 'Error',
          message: 'You cannot delete this category as the event has passed!',
        },
      });
    }
  }

  itemDeleted(itemId: number) {
    this.budgetService.removeBudgetItemSolution(this.budgetItem.id, itemId).subscribe({
      next: (response: any) => {
        this.budgetItem.budgetedEntries = this.budgetItem.budgetedEntries.filter(entry => entry.solutionId !== itemId);
      },
      error: (err: any) => {
        this.dialog.open(ErrorDialogComponent, {
          width: '400px',
          disableClose: true, // prevents closing by clicking outside
          backdropClass: 'blurred_backdrop_dialog',
          data: {
            title: 'Error',
            message: "Couldn't delete item. Try again.",
          },
        });
      }
    })
  }

  isEditable(): boolean {
    let currentDate: Date = new Date();
    return this.eventDate > currentDate  
  }
}
