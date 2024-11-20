import { Component } from '@angular/core';
import { Service } from '../model/services.model';
import { Product } from '../model/products.model';
import { EventType } from '../../events/model/event-type.model';
import { SolutionCard } from '../model/solution-card.model';
import { ReservationConfirmationType } from '../model/services.model';
import { Status } from '../model/category.model';
import { ViewEncapsulation } from '@angular/core';
import { SolutionsServiceService } from '../services/solutions/solutions-service.service';


@Component({
  selector: 'app-all-solutions',
  templateUrl: './all-solutions.component.html',
  styleUrl: './all-solutions.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class AllSolutionsComponent {
  allSolutions: SolutionCard[];
  sortValue: string = "Category";
  
  constructor(solutionsService: SolutionsServiceService) {
    this.allSolutions = solutionsService.getAllSolutions();
  }

  isService(solutionCard: SolutionCard): boolean {
    return (solutionCard.product === undefined);
  }

  isProduct(solutionCard: SolutionCard): boolean {
    return (solutionCard.service === undefined);
  }
}
