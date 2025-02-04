import {Component, ElementRef, ViewChild} from '@angular/core';
import {EventTypeCard} from '../../events/model/events.model';
import {CategoryWithId} from '../../solutions/model/category-with-id.model';
import {Category, Status} from '../../solutions/model/category.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EventTypeService} from '../../events/event-type.service';
import {SolutionCategoryService} from '../../solutions/services/solutions/solution-category.service';
import {AuthService} from '../../infrastructure/auth/auth.service';
import {ServicesService} from '../../services/services/services/services.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {CreateService, Service} from '../../services/model/services.model';
import {ErrorDialogComponent} from '../../shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  serviceType: string = '';
  allEventTypes: EventTypeCard[] = [];
  allSolutionCategories: CategoryWithId[] = [{id: -1337, name: "New Category", description:"filler text", status: Status.PENDING}];
  selectedFiles: Array<any> = [];

  serviceForm = new FormGroup({
    serviceCategory: new FormControl(null, [Validators.required]),
    name: new FormControl ('', [Validators.required]),
    description: new FormControl ('', [Validators.required]),
    specifics: new FormControl ('', [Validators.required]),
    serviceType: new FormControl ('', [Validators.required]),
    duration: new FormControl (null, [Validators.required]),
    minDuration: new FormControl (null, [Validators.required]),
    maxDuration: new FormControl (null, [Validators.required]),
    daysNoticeForReservation: new FormControl (null, [Validators.required]),
    daysNoticeForCancellation: new FormControl (null, [Validators.required]),
    autoAccept: new FormControl (false),
    relevantEventTypes: new FormControl ([], [Validators.required]),
    price: new FormControl (null, [Validators.required, Validators.min(0)]),
    discount: new FormControl (null, [Validators.required, Validators.min(0), Validators.max(100)]),
    images: new FormControl (null),
    newCategoryName: new FormControl (null),
    newCategoryDescription: new FormControl (null),
  });

  constructor(private eventTypeService: EventTypeService, private solutionCategoryService: SolutionCategoryService,
              private authService: AuthService, private servicesService: ServicesService, private dialog: MatDialog, private router: Router) {
    this.serviceForm.get('serviceType')?.valueChanges.subscribe(value => {
      if (value === 'variable') {
        this.serviceForm.get('duration')?.clearValidators();
        this.serviceForm.get('minDuration')?.setValidators([Validators.required]);
        this.serviceForm.get('maxDuration')?.setValidators([Validators.required]);
      } else {
        this.serviceForm.get('minDuration')?.clearValidators();
        this.serviceForm.get('maxDuration')?.clearValidators();
        this.serviceForm.get('duration')?.setValidators([Validators.required]);
      }



      this.serviceForm.get('duration')?.updateValueAndValidity();
      this.serviceForm.get('minDuration')?.updateValueAndValidity();
      this.serviceForm.get('maxDuration')?.updateValueAndValidity();
    });

    this.serviceForm.get('serviceCategory')?.valueChanges.subscribe(value => {
      if (value === -1337) {
        this.serviceForm.get('newCategoryName')?.setValidators([Validators.required]);
        this.serviceForm.get('newCategoryDescription')?.setValidators([Validators.required]);
      } else {
        this.serviceForm.get('newCategoryName')?.clearValidators();
        this.serviceForm.get('newCategoryDescription')?.clearValidators();
      }

      this.serviceForm.get('newCategoryName')?.updateValueAndValidity();
      this.serviceForm.get('newCategoryDescription')?.updateValueAndValidity();
    });
  }

  ngOnInit() {
    this.eventTypeService.getActiveEventTypes().subscribe({
      next: (response: EventTypeCard[]) => {
        this.allEventTypes = response;
      }
    })
    this.solutionCategoryService.getAll().subscribe({
      next: (response: CategoryWithId[]) => {
        this.allSolutionCategories.push(...response);
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

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }


  submit() {
    if (this.serviceForm.valid) {
      let response;

      let newService: CreateService = {
        name: this.serviceForm.get('name').value,
        description: this.serviceForm.get('description').value,
        price: this.serviceForm.get('price').value,
        discount: this.serviceForm.get('discount').value,
        imageUrls: this.selectedFiles.map(file => file.preview),
        providerId: this.authService.getId(),
        categoryId: this.serviceForm.get('serviceCategory').value === -1337 ? null : this.serviceForm.get('serviceCategory').value,
        relatedEventTypeIds: this.serviceForm.get('relevantEventTypes').value,
        specifics: this.serviceForm.get('specifics').value,
        minReservationTime: this.serviceForm.get('minDuration').value,
        maxReservationTime: this.serviceForm.get('maxDuration').value,
        reservationDeadline: this.serviceForm.get('daysNoticeForReservation').value,
        cancellationDeadline: this.serviceForm.get('daysNoticeForCancellation').value,
        automaticReservationAcceptance: this.serviceForm.get('autoAccept').value,
      }

      if (this.serviceForm.get('serviceCategory').value === -1337) {
        let newCategory: Category = {name: this.serviceForm.get('newCategoryName').value, description: this.serviceForm.get('newCategoryDescription').value, status: Status.PENDING};
        this.solutionCategoryService.create(newCategory).subscribe({
          next: (category: CategoryWithId) => {
            newService.categoryId = category.id;
            response = this.servicesService.add(newService);
            response.subscribe({
              next: (createdService: Service) => {
                this.router.navigate(["my-services"]);
              }
            })
          }
        })
      } else {
        response = this.servicesService.add(newService);
        response.subscribe({
          next: (createdService: Service) => {
            this.router.navigate(["my-services"]);
          }
        })
      }
      // The reason I have two separate calls towards the add method depends on whether a category must be created first. If yes,
      // we must ensure that we grab the ID of the new (currently pending) category and use it in our new service

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
