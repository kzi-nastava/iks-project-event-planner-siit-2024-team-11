import { Component } from '@angular/core';
import { Budget } from '../model/budget.model';
import { ActivatedRoute } from '@angular/router';
import { BudgetService } from '../services/budget-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';
import { BudgetMenuCategoryInputDialogComponent } from '../budget-menu-category-input-dialog/budget-menu-category-input-dialog.component';

@Component({
  selector: 'app-budget-menu',
  templateUrl: './budget-menu.component.html',
  styleUrl: './budget-menu.component.css'
})
export class BudgetMenuComponent {

  eventId: number = -1;
  budget: Budget = {
    categoryItems: [],
    eventDate: new Date()
  }

  constructor(private dialog: MatDialog, private route: ActivatedRoute, private budgetService: BudgetService) {
    this.eventId = route.snapshot.params['eventId'];
  }

  ngOnInit() {
    this.fetchData()
  }

  fetchData() {
    this.budgetService.get(this.eventId).subscribe({
      next: (budget: Budget) => {
        this.budget = budget
      },
      error: (err) => {
        if (err.response === 403) {
          this.dialog.open(ErrorDialogComponent, {
            width: '400px',
            disableClose: true, // prevents closing by clicking outside
            backdropClass: 'blurred_backdrop_dialog',
            data: {
              title: 'Forbidden',
              message: 'You are not allowed to view budgets of events you are not organizing!',
            },
          });
        }
      }
    })
  }

  handleBudgetItemAdded() {
    let dialogRef = this.dialog.open(BudgetMenuCategoryInputDialogComponent, {
      width: '400px',
      disableClose: true,
      backdropClass: 'blurred_backdrop_dialog',
      data: {
        eventId: this.eventId
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result && result[0]) {
        this.budget.categoryItems.push(result[1])
      }
    })
  }

  budgetItemDeleted(budgetItemId: number) {
    this.budgetService.removeBudgetItem(budgetItemId).subscribe({
      next: (response: any) => {
        this.budget.categoryItems.filter(entry => entry.id !== budgetItemId);
      },
      error: (err: Error) => {
         this.dialog.open(ErrorDialogComponent, {
            width: '400px',
            disableClose: true, // prevents closing by clicking outside
            backdropClass: 'blurred_backdrop_dialog',
            data: {
              title: 'Error',
              message: "Couldn't delete category as there are services that cannot be cancalled.",
            },
          });
        }
      })
  }

  isEditable(): boolean {
    let currentDate: Date = new Date();
    return this.budget.eventDate > currentDate  
  }

}
