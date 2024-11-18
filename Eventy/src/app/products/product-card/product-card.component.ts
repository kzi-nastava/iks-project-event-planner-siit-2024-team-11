import { Component, Input } from '@angular/core';
import { Product } from '../../solutions/model/products.model';
import { Solution } from '../../solutions/model/solutions.model';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product: Solution;

  
}
