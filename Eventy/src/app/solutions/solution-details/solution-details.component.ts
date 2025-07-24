import { AfterViewChecked, AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { SolutionCard } from '../model/solution-card.model';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SolutionsService } from '../services/solutions/solutions-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { SuccessfulDialogComponent } from '../../shared/successful-dialog/successful-dialog.component';
import { SolutionDTO } from '../model/solutions.model';
import { ChatService } from '../../chat/chat.service';
import { ProductService } from '../../products/product.service';
import { EventsService } from '../../events/services/events/events-service.service';
import { OwnEventsDialogComponent } from '../../events/own-events-dialog/own-events-dialog.component';
import { ReviewService } from '../../reviews/service/review.service';
import { CreateReview, Review } from '../../reviews/model/review.model';
import { CreateReviewComponent } from '../../reviews/create-review/create-review.component';
import { YesNoFancierDialogComponent } from '../../shared/yes-no-fancier-dialog/yes-no-fancier-dialog.component';

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
  reviews: Review[] = []

  constructor(private route: ActivatedRoute, private solutionService: SolutionsService, private dialog: MatDialog, private router: Router,
              private authService: AuthService, private chatService: ChatService, private productService: ProductService, private eventService: EventsService,
              private reviewService: ReviewService) {
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
    this.reviewService.getAllForSolution(id).subscribe({
      next: (reviews: Review[]) => {
        this.reviews = reviews;
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
    const yesNoRef = this.dialog.open(YesNoFancierDialogComponent, {
      width: '400px',
      disableClose: true, // prevents closing by clicking outside
      backdropClass: 'blurred_backdrop_dialog',
      data: {
        title: 'Confirm Purchase', 
        message: 'Are you sure you want to delete ' + this.solution.name + '?',
      },
    });

    yesNoRef.afterClosed().subscribe((result) => {
      if (result) {
        this.solutionService.delete(this.solution.solutionId).subscribe({
          next: (response: any) => {
            this.router.navigate(['']);
          },
          error: () => {
            this.errorDialog("Error deleting the solution", "Error deleting the solution.")
          }
        })
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
              }).afterClosed().subscribe(() => {
                this.reviewService.isSolutionReviewedByUser(this.authService.getId(), this.solution.solutionId).subscribe({
                    next: (isReviewed) => {
                      if (!isReviewed) {
                        let createReview: CreateReview = {
                          graderId: this.authService.getId(),
                          solutionId: this.solution.solutionId,
                          eventId: null,
                          grade: null,
                          comment: null
                        }
                    
                        const dialogRef = this.dialog.open(CreateReviewComponent, {
                          disableClose: true, // Prevent closing by clicking outside
                          data: {
                            title: `"${this.solution.name}"`,
                            message: `Please rate the product you purchased!`,
                            createReview: createReview
                          }
                        });
                        dialogRef.afterClosed().subscribe(() => {
                          this.router.navigate(['']).then(() => {
                            window.location.reload();
                          });
                        });
                      }
                    }
              })
              });
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
    if (this.currentRole === "ROLE_Organizer") {
      if (this.solution.solutionId != 0) {
        this.router.navigate(['/create-reservation'], { state: { selectedService: this.solution } });
     
      } else {
        this.errorDialog("Error", "A service is required to proceed with the reservation!")
      }
     
    } else {
      this.errorDialog("Forbidden action", "You can only do this as an organizer!")
    }
  }

  openChat() {
    this.chatService.createChat(this.solution.providerId).subscribe({
      next: (value: any) => {
        if(this.authService.getRole()) {
          this.router.navigate(['chat'], {
            state: { newChatOpen: true }
          })
        } else {
          this.dialog.open(ErrorDialogComponent, {
            width: '400px',
            disableClose: true, // prevents closing by clicking outside
            backdropClass: 'blurred_backdrop_dialog',
            data: {
              title: "Can't open chat if you are not logged in",
              message: 'Please log in to access the chat.',
            },
          });
        }
      },
      error: (err) => {
        this.dialog.open(ErrorDialogComponent, {
          width: '400px',
          disableClose: true, // prevents closing by clicking outside
          backdropClass: 'blurred_backdrop_dialog',
          data: {
            title: "Error",
            message: 'Unexpected error while opening chat!',
          },
        });
        console.log(err)
      }
    })
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
