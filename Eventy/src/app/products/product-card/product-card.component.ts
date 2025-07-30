import { Component, Input, inject } from '@angular/core';
import { SolutionCard } from '../../solutions/model/solution-card.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SolutionsService } from '../../solutions/services/solutions/solutions-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  private _snackBar = inject(MatSnackBar);
  @Input() productCard: SolutionCard;

  constructor(private solutionService: SolutionsService, private dialog: MatDialog) {

  }

  handleFavoriteItem() {
    this.solutionService.toggleFavorite(this.productCard.solutionId).subscribe({
      next: any => {
        this.productCard.isFavorite = !this.productCard.isFavorite;
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
