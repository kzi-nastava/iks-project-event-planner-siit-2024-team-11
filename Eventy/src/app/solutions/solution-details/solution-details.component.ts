import { AfterViewChecked, Component } from '@angular/core';
import { SolutionCard } from '../model/solution-card.model';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SolutionsService } from '../services/solutions/solutions-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-solution-details',
  templateUrl: './solution-details.component.html',
  styleUrl: './solution-details.component.css'
})
export class SolutionDetailsComponent {
  solution: SolutionCard = {
    solutionId: 0,
    type: 'PRODUCT',
    name: '',
    categoryName: '',
    description: '',
    eventTypeNames: [],
    price: 0,
    discount: 0,
    firstImageUrl: '',
    isAvailable: false,
    providerId: 0,
    providerName: '',
    providerImageUrl: ''
  }

  constructor(private route: ActivatedRoute, private solutionService: SolutionsService, private dialog: MatDialog, private router: Router) {
    let id: number = route.snapshot.params['solutionId'];
    solutionService.getSolution(id).subscribe({
      next: (card: SolutionCard) => {
        this.solution = card;
      },
      error: (card: SolutionCard) => {
        this.dialog.open(ErrorDialogComponent, {
          width: '400px',
          disableClose: false,
          backdropClass: 'blurred_backdrop_dialog',
          data: {
            title: "Error loading the solution",
            message: 'Error loading the solution.',
          },
        });
      }
    })
  }

  ngOnInit() {
      window.scrollTo(0, 0);
  }

  handleFavoriteItem() {
    // TO-DO
  }

  purchaseProduct() {
    // TO-DO
  }

  reserveService() {
    // TO-DO
  }

  openChat() {
    // TO-DO
  }
}
