import { Component, Input, inject } from '@angular/core';
import { SolutionCard } from '../../solutions/model/solution-card.model';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  private _snackBar = inject(MatSnackBar);
  @Input() productCard: SolutionCard;

  handleFavoriteItem() {
    this._snackBar.open("FAVORITE: " + this.productCard.name, "OK!");
  }
}
