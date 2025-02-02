import { Component, Input, inject } from '@angular/core';
import { SolutionCard } from '../../solutions/model/solution-card.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SolutionsService } from '../../solutions/services/solutions/solutions-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.css'
})
export class ServiceCardComponent {
  private _snackBar = inject(MatSnackBar);
  @Input() serviceCard: SolutionCard;

  constructor(private solutionService: SolutionsService, private dialog: MatDialog) {
    
  }

  handleFavoriteItem() {
    console.log("BEFORE: " + this.serviceCard.isFavorite)
    this.solutionService.toggleFavorite(this.serviceCard.solutionId).subscribe({
      next: Boolean => {
        this.serviceCard.isFavorite = !this.serviceCard.isFavorite;
        console.log("AFTER: " + this.serviceCard.isFavorite)
      },
      error: any => {
      this.dialog.open(ErrorDialogComponent, {
        width: '400px',
        disableClose: true,
        backdropClass: 'blurred_backdrop_dialog',
        data: {
          title: "Can't like if you aren't logged in",
          message: 'Please log in to make this your favorite event.',
        },
      });
    }
    })
  }
}
