import { Component } from '@angular/core';
import { SolutionCard } from '../model/solution-card.model';
import { SolutionsServiceService } from '../services/solutions/solutions-service.service';
import { ServiceCardComponent } from '../../services/service-card/service-card.component';
import { ServicesModule } from '../../services/services.module';
import { ProductsModule } from '../../products/products.module';

@Component({
  selector: 'app-featured-solutions',
  templateUrl: './featured-solutions.component.html',
  styleUrl: './featured-solutions.component.css',
})
export class FeaturedSolutionsComponent {
  featuredSolutions: SolutionCard[];

  constructor(solutionsService: SolutionsServiceService ) {
    this.featuredSolutions = solutionsService.getFeaturedSolutions();
  }

  isService(solutionCard: SolutionCard): boolean {
    return (solutionCard.product === undefined);
  }

  isProduct(solutionCard: SolutionCard): boolean {
    return (solutionCard.service === undefined);
  }
}
