import { Component, Input } from '@angular/core';
import { SolutionCard } from '../../solutions/model/solution-card.model';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() productCard: SolutionCard;

  
}
