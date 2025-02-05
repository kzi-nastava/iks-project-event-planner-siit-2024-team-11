import {Component, ElementRef, ViewChild} from '@angular/core';
import {EventDetails, EventTypeCard} from '../../events/model/events.model';
import {CategoryWithId} from '../../solutions/model/category-with-id.model';
import {Status} from '../../solutions/model/category.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EventTypeService} from '../../events/event-type.service';
import {SolutionCategoryService} from '../../solutions/services/solutions/solution-category.service';
import {ProductService} from '../product.service';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorDialogComponent} from '../../shared/error-dialog/error-dialog.component';
import {Product} from '../model/products.model';
import {SuccessfulDialogComponent} from '../../shared/successful-dialog/successful-dialog.component';
import {SolutionsService} from '../../solutions/services/solutions/solutions-service.service';
import {SolutionDTO} from '../../solutions/model/solutions.model';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent {
  allEventTypes: EventTypeCard[] = [];
  allSolutionCategories: CategoryWithId[] = [{id: -1337, name: "New Category", description:"filler text", status: Status.PENDING}];
  selectedFiles: Array<any> = [];

  productFrom: FormGroup;

  constructor(private eventTypeService: EventTypeService, private solutionCategoryService: SolutionCategoryService,
              private productService: ProductService, private dialog: MatDialog, private router: Router,
              private solutionService: SolutionsService, private route: ActivatedRoute) {
    this.eventTypeService.getActiveEventTypes().subscribe({
      next: (response: EventTypeCard[]) => {
        this.allEventTypes = response;

        let id: number = route.snapshot.params['eventId'];
        this.solutionService.get(id).subscribe({
          next: (solution: SolutionDTO) => {
            this.productFrom = new FormGroup({
              productCategory: new FormControl({value: solution.categoryName, disabled: true }),
              name: new FormControl (solution.name, [Validators.required]),
              description: new FormControl (solution.description, [Validators.required]),
              isAvailable: new FormControl (solution.isAvailable),
              isVisible: new FormControl (solution.isVisible),
              relevantEventTypes: new FormControl (solution.eventTypeNames.map(name => this.allEventTypes.find(type => type.name === name)), [Validators.required]),
              price: new FormControl (solution.price, [Validators.required, Validators.min(0)]),
              discount: new FormControl (solution.discount, [Validators.required, Validators.min(0), Validators.max(100)]),
              images: new FormControl (solution.images),
            });

            for(let image of solution.images) {
              this.selectedFiles.push({ image, preview: image });
            }
          },
          error: (event: EventDetails) => {
            this.dialog.open(ErrorDialogComponent, {
              width: '400px',
              disableClose: true, // prevents closing by clicking outside
              backdropClass: 'blurred_backdrop_dialog',
              data: {
                title: "Error while loading the product",
                message: 'Error while loading the product.',
              },
            });
          }
        });
      },
      error: () => {
        this.dialog.open(ErrorDialogComponent, {
          width: '400px',
          disableClose: true, // prevents closing by clicking outside
          backdropClass: 'blurred_backdrop_dialog',
          data: {
            title: "Error while getting event types",
            message: 'Error while getting event types. Please try again later.',
          },
        });
      }
    })

    this.solutionCategoryService.getAll().subscribe({
      next: (response: CategoryWithId[]) => {
        this.allSolutionCategories.push(...response);
      },
      error: () => {
        this.dialog.open(ErrorDialogComponent, {
          width: '400px',
          disableClose: true, // prevents closing by clicking outside
          backdropClass: 'blurred_backdrop_dialog',
          data: {
            title: "Error while getting product categories",
            message: 'Error while getting product categories. Please try again later.',
          },
        });
      }
    })
  }

  @ViewChild('addPictures') fileInput!: ElementRef<HTMLInputElement>;

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onFilesSelected(event: any): void {
    const files = event.target.files;
    this.selectedFiles = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedFiles.push({ file, preview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  submit() {
    if (this.productFrom.valid) {
      let response;

      let product: Product = {
        id: 5, // dont hardcode it
        name: this.productFrom.get('name').value,
        description: this.productFrom.get('description').value,
        price: this.productFrom.get('price').value,
        discount: this.productFrom.get('discount').value,
        imageUrls: this.selectedFiles.map(file => file.preview),
        relatedEventTypes: this.productFrom.get('relevantEventTypes').value,
        isAvailable: this.productFrom.get('isAvailable').value,
        isVisible: this.productFrom.get('isVisible').value
      }

      response = this.productService.update(product);
      response.subscribe({
        next: (product: Product) => {
          this.dialog.open(SuccessfulDialogComponent, {
            width: '400px',
            disableClose: true, // Prevent closing by clicking outside
            backdropClass: 'blurred_backdrop_dialog',
            data: {
              title: "Product added",
              message: "Product added successfully",
            },
          }).afterClosed().subscribe(() => this.router.navigate(['my-profile']));
        },
        error: () => {
          this.dialog.open(ErrorDialogComponent, {
            width: '400px',
            disableClose: true,
            backdropClass: 'blurred_backdrop_dialog',
            data: {
              title: 'Input Error',
              message: 'Please make sure that all inputs are valid.',
            },
          });
        }
      })
    }
    else {
      this.dialog.open(ErrorDialogComponent, {
        width: '400px',
        disableClose: true,
        backdropClass: 'blurred_backdrop_dialog',
        data: {
          title: 'Input Error',
          message: 'Please make sure that all inputs are valid.',
        },
      });
    }
  }
}
