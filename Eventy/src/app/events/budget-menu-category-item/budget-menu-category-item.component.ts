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
  

  handleRemoveItem(event: MouseEvent): void {
    event.stopPropagation()
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
    let eventDate: Date = new Date(this.eventDate)
    console.log(this.solutionCard.cancellationDeadline)
    if (this.solutionCard.cancellationDeadline !== null) {
      currentDate.setDate(currentDate.getDate() + this.solutionCard.cancellationDeadline)
    }
    return eventDate > currentDate  
  }
}
