import { AfterViewChecked, AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { SolutionCard } from '../model/solution-card.model';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SolutionsService } from '../services/solutions/solutions-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { SuccessfulDialogComponent } from '../../shared/successful-dialog/successful-dialog.component';
import { SolutionDTO } from '../model/solutions.model';
import { ProductService } from '../../products/product.service';
import { EventsService } from '../../events/services/events/events-service.service';
import { OwnEventsDialogComponent } from '../../events/own-events-dialog/own-events-dialog.component';

@Component({
  selector: 'app-solution-details',
  templateUrl: './solution-details.component.html',
  styleUrl: './solution-details.component.css'
})
export class SolutionDetailsComponent {
  currentUser: number = 0;
  currentRole: string = "";
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
              private authService: AuthService, private productService: ProductService, private eventService: EventsService) {
    this.currentUser = authService.getId()
    this.currentRole = authService.getRole()
    let id: number = route.snapshot.params['solutionId'];
    solutionService.get(id).subscribe({
      next: (card: SolutionDTO) => {
        this.solution = card;
      },
      error: (error) => {
        if (error.status === 403) {
          const dialogRef = this.dialog.open(ErrorDialogComponent, {
            data: {
              title: "Content Blocked!",
              message: `You cannot access the content of a blocked account!`
            }
          });

          dialogRef.afterClosed().subscribe(() => {
           this.router.navigate(['']);
          });

        } else {
          const dialogRef = this.dialog.open(ErrorDialogComponent, {
            data : {
              title: "Loading Error!",
              message: "There has been a problem while loading this page."
            }
          });

          dialogRef.afterClosed().subscribe(() => {
           this.router.navigate(['']);
          });
        }   
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
        this.errorDialog("Error deleting the solution", "Error deleting the solution.")
      }
    })
  }

  purchaseProduct() {
    if (this.currentRole === "ROLE_Organizer") {
      let dialogRef = this.dialog.open(OwnEventsDialogComponent, {
        width: "95%",
        maxWidth: "100%",
        height: "700px",
        backdropClass: 'blurred_backdrop_dialog',
      })
      
      dialogRef.afterClosed().subscribe(retVal => {
        let accepted: boolean = retVal[0]
        let eventId: number = retVal[1]
        if (accepted && eventId !== -1) {
          this.productService.purchase(this.solution.solutionId, eventId).subscribe({
            next: (response: any) => {
              this.dialog.open(SuccessfulDialogComponent, {
                disableClose: true, // Prevent closing by clicking outside
                backdropClass: 'blurred_backdrop_dialog',
                data: {
                  title: "Product purchased",
                  message: "Product purchased successfully!",
                },
              }).afterClosed().subscribe(() => this.router.navigate(['']));
            },
            error: () => {
              this.errorDialog("Error", "Error with purchasing this product!");
            }
          })
        } else if (eventId === -1) {
          this.errorDialog("Error", "Error picking event");
        }
      })
    } else {
      this.errorDialog("Forbidden action", "You can only do this as an organizer!")
    }
  }

  reserveService() {
    // TO-DO
  }

  openChat() {
    // TO-DO
  }

  private errorDialog(title: string, message: string) {
    this.dialog.open(ErrorDialogComponent, {
      width: '400px',
      disableClose: false,
      backdropClass: 'blurred_backdrop_dialog',
      data: {
        title: title,
        message: message,
      },
    });
  }
}
