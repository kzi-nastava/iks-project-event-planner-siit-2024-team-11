import { Component, Input, inject } from '@angular/core';
import { SolutionCard } from '../../solutions/model/solution-card.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.css'
})
export class ServiceCardComponent {
  private _snackBar = inject(MatSnackBar);
  @Input() serviceCard: SolutionCard;

  handleFavoriteItem() {
    this._snackBar.open("FAVORITE: " + this.serviceCard.name, "OK!");
  }

  handleSeeMore() {
    this._snackBar.open("SEE MORE: " + this.serviceCard.name, "OK!");
  }
}
