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
    const filters = {
      type: "Service",
    }; // only show services
    const params = {...filters};

    // you will need to add pagination and sort (since you shouldn't probably load all existing
    // services, since there can be 1312312312 of them..)
    
    // IF YOU WANT: add filter but without "Type" input/button (type can be: "Any", "Service", "Product"),
    //              and you only need to show Services, so no need for that filter
    // NOTE: for pagination and filter see an example in all-events.component.ts
    // for SERVICES-ONLY, filter "type" in 'solutionsService.getAllSolutions()' will need to be 'SERVICE'
    this.solutionsService.getAllSolutions(
      { page: 0, pageSize: 5, sort: "category" }, // Pagination and sort params
      params

      // ANOTHER NOTE: default value for isAvailable is TRUE, so it will probably automatically
      //               show only available services (for this you will need to add filters like from homepage if you want otherwise)
      //               THERE MAY BE similar cases with default values, so check the SolutionController getAll() method for that!
    ).subscribe({
      next: (response: PagedResponse<SolutionCard>) => {
        this.paginatedServices = response.content;
        //this.totalCount = response.totalElements;  // this is for pagination (example: "RESULT: showing 15 of 232") --> 232 is totalCount
      },
      error: (err) => {
        console.error('Failed to fetch events:', err);
      },
    });
  }
}
