import { AfterViewChecked, AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { SolutionCard } from '../model/solution-card.model';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SolutionsService } from '../services/solutions/solutions-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { SuccessfulDialogComponent } from '../../shared/successful-dialog/successful-dialog.component';
import { SolutionDTO } from '../model/solutions.model';

@Component({
  selector: 'app-solution-details',
  templateUrl: './solution-details.component.html',
  styleUrl: './solution-details.component.css'
})
export class SolutionDetailsComponent {
  currentUser: number = 0;
  solution: SolutionDTO = {
    solutionId: 0,
    type: 'PRODUCT',
    name: '',
    categoryName: '',
    description: '',
    eventTypeNames: [],
    price: 0,
    discount: 0,
    images: [],
    isAvailable: false,
    providerId: 0,
    providerName: '',
    providerImageUrl: '',
    isFavorite: false,
    isVisible: false
  }

  constructor(private route: ActivatedRoute, private solutionService: SolutionsService, private dialog: MatDialog, private router: Router,
              private authService: AuthService) {
    this.currentUser = authService.getId()
    let id: number = route.snapshot.params['solutionId'];
    solutionService.get(id).subscribe({
      next: (card: SolutionDTO) => {
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
    this.solutionService.toggleFavorite(this.solution.solutionId).subscribe({
      next: Boolean => {
        this.solution.isFavorite = !this.solution.isFavorite;
      },
      error: any => {
      this.dialog.open(ErrorDialogComponent, {
        width: '400px',
        disableClose: true,
        backdropClass: 'blurred_backdrop_dialog',
        data: {
          title: "Can't like if you aren't logged in",
          message: 'Please log in to make this your favorite event.',
        },
      });
    }
    })
  }

  editSolution(): void {
    if (this.solution.type === "PRODUCT") {
      this.router.navigate(['/edit-product', this.solution.solutionId])
    } else {
      this.router.navigate(['/edit-service', this.solution.solutionId])
    }
  }

  toggleVisibility(): void {
    this.solutionService.toggleVisibility(this.solution.solutionId).subscribe({
      next: (response: any) => {
        this.solution.isVisible = !this.solution.isVisible;
        this.dialog.open(SuccessfulDialogComponent, {
          width: '400px',
          disableClose: true, // Prevent closing by clicking outside
          backdropClass: 'blurred_backdrop_dialog',
          data: {
            title: "Success",
            message: this.solution.isVisible ? "The solution is now visible to everyone!" : "The solution is now visible to you only!", 
          },     
        })
      },
      error: () => {
        this.dialog.open(ErrorDialogComponent, {
          width: '400px',
          disableClose: false,
          backdropClass: 'blurred_backdrop_dialog',
          data: {
            title: "Error changing the visibility",
            message: "Error changing the visibility."
          },
        });
      }
    })
  }

  toggleAvailability(): void {
    this.solutionService.toggleAvailablity(this.solution.solutionId).subscribe({
      next: (response: any) => {
        this.solution.isAvailable = !this.solution.isAvailable;
        this.dialog.open(SuccessfulDialogComponent, {
          width: '400px',
          disableClose: true, // Prevent closing by clicking outside
          backdropClass: 'blurred_backdrop_dialog',
          data: {
            title: "Success",
            message: this.solution.isAvailable ? "The solution is now available!" : "The solution is now unavailable!", 
          },     
        })
      },
      error: () => {
        this.dialog.open(ErrorDialogComponent, {
          width: '400px',
          disableClose: false,
          backdropClass: 'blurred_backdrop_dialog',
          data: {
            title: "Error changing the availability",
            message: 'Error changing the availability.',
          },
        });
      }
    })
  }

  deleteSolution(): void {
    this.solutionService.delete(this.solution.solutionId).subscribe({
      next: (response: any) => {
        this.router.navigate(['']);
      },
      error: () => {
        this.dialog.open(ErrorDialogComponent, {
          width: '400px',
          disableClose: false,
          backdropClass: 'blurred_backdrop_dialog',
          data: {
            title: "Error deleting the solution",
            message: 'Error deleting the solution.',
          },
        });
      }
    })
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
