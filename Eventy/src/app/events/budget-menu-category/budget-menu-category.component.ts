import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BudgetItem } from '../model/budget.model';
import { BudgetService } from '../services/budget-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';
import { BudgetMenuCategoryEditDialogComponent } from '../budget-menu-category-edit-dialog/budget-menu-category-edit-dialog.component';
import { BudgetMenuSolutionSelectionDialogComponent } from '../budget-menu-solution-selection-dialog/budget-menu-solution-selection-dialog.component';
import { ReviewService } from '../../reviews/service/review.service';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { CreateReview } from '../../reviews/model/review.model';
import { CreateReviewComponent } from '../../reviews/create-review/create-review.component';
import { Router } from '@angular/router';

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

  constructor(private dialog: MatDialog, private budgetService: BudgetService, private reviewService: ReviewService,
              private authService: AuthService, private router: Router) {
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
        this.reviewService.isSolutionReviewedByUser(this.authService.getId(), result[1].solutionId).subscribe({
              next: (isReviewed) => {
                if (!isReviewed) {
                  let createReview: CreateReview = {
                    graderId: this.authService.getId(),
                    solutionId: result[1].solutionId,
                    eventId: null,
                    grade: null,
                    comment: null
                  }
              
                  const dialogRef = this.dialog.open(CreateReviewComponent, {
                    disableClose: true, // Prevent closing by clicking outside
                    data: {
                      title: `"${result[1].name}"`,
                      message: `Please rate the product you purchased!`,
                      createReview: createReview
                    }
                  });
                  dialogRef.afterClosed().subscribe(() => {
                    this.router.navigate(['']).then(() => {
                      window.location.reload();
                    });
                  });
                }
              }
        })
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
        this.budgetItem.budgetedEntries = this.budgetItem.budgetedEntries.filter(entry => entry.id !== itemId);
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
    let actualEventDate: Date = new Date(this.eventDate);
    return actualEventDate > currentDate  
  }
}
