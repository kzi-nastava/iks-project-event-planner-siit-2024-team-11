import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SolutionDTO, SolutionHistory } from '../../solutions/model/solutions.model';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-budget-menu-category-item',
  templateUrl: './budget-menu-category-item.component.html',
  styleUrl: './budget-menu-category-item.component.css'
})
export class BudgetMenuCategoryItemComponent {
  @Input() solutionCard: SolutionHistory = {
      id: 0,
      providerName: "",
      name: "",
      description: "",
      price: 0,
      discount: 0,
      cancellationDeadline: null
  }

  @Input() eventDate: Date

  @Output() itemDeleted: EventEmitter<number> = new EventEmitter()

  constructor(private dialog: MatDialog) {

  }
  

  handleRemoveItem(): void {
    if (this.isCancellable()) {
      this.itemDeleted.emit(this.solutionCard.id);
    } else {
      this.dialog.open(ErrorDialogComponent, {
        width: '400px',
        disableClose: true, // prevents closing by clicking outside
        backdropClass: 'blurred_backdrop_dialog',
        data: {
          title: 'Error',
          message: 'You cannot cancel this as the event or the cancellation date has passed!',
        },
      });
    }
  }

  isCancellable(): boolean {
    let currentDate: Date = new Date();
    if (this.solutionCard.cancellationDeadline !== null) {
      let tempDate: Date = new Date(this.eventDate)
      tempDate.setDate(tempDate.getDate() + this.solutionCard.cancellationDeadline)
      return tempDate > currentDate
    }
    return this.eventDate > currentDate  
  }
}
