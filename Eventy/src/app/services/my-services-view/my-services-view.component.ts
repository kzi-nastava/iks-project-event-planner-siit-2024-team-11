import { Component } from '@angular/core';
import { SolutionsService } from '../../solutions/services/solutions/solutions-service.service';
import { SolutionCard } from '../../solutions/model/solution-card.model';
import { PagedResponse } from '../../shared/model/paged-response.model';

@Component({
  selector: 'app-my-services-view',
  templateUrl: './my-services-view.component.html',
  styleUrl: './my-services-view.component.css'
})
export class MyServicesViewComponent {
  paginatedServices: SolutionCard[] = [];

  constructor(private solutionsService : SolutionsService) {}

  ngOnInit() {
    // NOTE: for pagination and filter see an example in all-events.component.ts
    // for SERVICES-ONLY, filter "type" in 'solutionsService.getAllSolutions()' will need to be 'SERVICE'
    this.solutionsService.getAllSolutions().subscribe({
      next: (response: PagedResponse<SolutionCard>) => {
        this.paginatedServices = response.content;
        //this.totalCount = response.totalElements;
      },
      error: (err) => {
        console.error('Failed to fetch events:', err);
      },
    });
  }
}
