import { Component } from '@angular/core';
import { SolutionCard } from '../model/solution-card.model';
import { SolutionsService } from '../services/solutions/solutions-service.service';

@Component({
  selector: 'app-featured-solutions',
  templateUrl: './featured-solutions.component.html',
  styleUrl: './featured-solutions.component.css',
})
export class FeaturedSolutionsComponent {
  featuredSolutions: SolutionCard[] = [];

  constructor(private solutionsService: SolutionsService ) {}

  ngOnInit(): void {
    this.solutionsService.getFeaturedSolutions().subscribe({
      next: (featuredSolutions) => {
        this.featuredSolutions = featuredSolutions;
      },
      error: (err) => {
        console.error('Failed to fetch featured solutions:', err);
      },
    });
  }

  isService(solutionCard: SolutionCard): boolean {
    return (solutionCard.type === "SERVICE");
  }

  isProduct(solutionCard: SolutionCard): boolean {
    return (solutionCard.type === "PRODUCT");
  }
}
