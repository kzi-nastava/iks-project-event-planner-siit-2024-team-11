import {Component, ElementRef, ViewChild} from '@angular/core';
import {EventTypeCard} from '../../events/model/events.model';
import {CategoryWithId} from '../../solutions/model/category-with-id.model';
import {Category, Status} from '../../solutions/model/category.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EventTypeService} from '../../events/event-type.service';
import {SolutionCategoryService} from '../../solutions/services/solutions/solution-category.service';
import {AuthService} from '../../infrastructure/auth/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ErrorDialogComponent} from '../../shared/error-dialog/error-dialog.component';
import {ProductService} from '../product.service';
import {CreateProduct, Product} from '../model/products.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  allEventTypes: EventTypeCard[] = [];
  allSolutionCategories: CategoryWithId[] = [{id: -1337, name: "New Category", description:"filler text", status: Status.PENDING}];
  selectedFiles: Array<any> = [];

  productFrom: FormGroup = new FormGroup({
    productCategory: new FormControl(null, [Validators.required]),
    name: new FormControl ('', [Validators.required]),
    description: new FormControl ('', [Validators.required]),
    isAvailable: new FormControl (false),
    isVisible: new FormControl (false),
    relevantEventTypes: new FormControl ([], [Validators.required]),
    price: new FormControl (null, [Validators.required, Validators.min(0)]),
    discount: new FormControl (null, [Validators.required, Validators.min(0), Validators.max(100)]),
    images: new FormControl (null),
    newCategoryName: new FormControl (null),
    newCategoryDescription: new FormControl (null),
  });

  constructor(private eventTypeService: EventTypeService, private solutionCategoryService: SolutionCategoryService,
              private authService: AuthService, private productService: ProductService, private dialog: MatDialog, private router: Router) {
    this.productFrom.get('productCategory')?.valueChanges.subscribe(value => {
      if (value === -1337) {
        this.productFrom.get('newCategoryName')?.setValidators([Validators.required]);
        this.productFrom.get('newCategoryDescription')?.setValidators([Validators.required]);
      } else {
        this.productFrom.get('newCategoryName')?.clearValidators();
        this.productFrom.get('newCategoryDescription')?.clearValidators();
      }

      this.productFrom.get('newCategoryName')?.updateValueAndValidity();
      this.productFrom.get('newCategoryDescription')?.updateValueAndValidity();
    });

    this.eventTypeService.getActiveEventTypes().subscribe({
      next: (response: EventTypeCard[]) => {
        this.allEventTypes = response;
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

      let newProduct: CreateProduct = {
        name: this.productFrom.get('name').value,
        description: this.productFrom.get('description').value,
        price: this.productFrom.get('price').value,
        discount: this.productFrom.get('discount').value,
        imageUrls: this.selectedFiles.map(file => file.preview),
        category: this.productFrom.get('productCategory').value === -1337 ? this.allSolutionCategories[0] : this.allSolutionCategories.find(category => category.id === this.productFrom.get('serviceCategory').value),
        relatedEventTypes: this.productFrom.get('relevantEventTypes').value,
        isAvailable: this.productFrom.get('isAvailable').value,
        isVisible: this.productFrom.get('isVisible').value
      }

      if (this.productFrom.get('productCategory').value === -1337) {
        let newCategory: Category = {name: this.productFrom.get('newCategoryName').value, description: this.productFrom.get('newCategoryDescription').value, status: Status.PENDING};
        this.solutionCategoryService.create(newCategory).subscribe({
          next: (category: CategoryWithId) => {
            newProduct.category = category;
            response = this.productService.add(newProduct);
            response.subscribe({
              next: (product: Product) => {
                this.router.navigate(["my-profile"]);
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
          },
          error: () => {
            this.dialog.open(ErrorDialogComponent, {
              width: '400px',
              disableClose: true,
              backdropClass: 'blurred_backdrop_dialog',
              data: {
                title: 'Category Input Error',
                message: 'Please make sure that all new category inputs are valid.',
              },
            });
          }
        })
      } else {
        response = this.productService.add(newProduct);
        response.subscribe({
          next: (product: Product) => {
            this.router.navigate(["profile"]);
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
