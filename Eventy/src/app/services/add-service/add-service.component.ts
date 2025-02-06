import { Component, ElementRef, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';  
import { EventTypeCard } from '../../events/model/events.model';
import { CategoryWithId } from '../../solutions/model/category-with-id.model';
import { EventTypeService } from '../../events/event-type.service';
import { SolutionCategoryService } from '../../solutions/services/solutions/solution-category.service';
import { Category, Status } from '../../solutions/model/category.model';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';
import { CreateService, Service } from '../model/services.model';
import { ServicesService } from '../services/services/services.service';
import { Router } from '@angular/router';
import { AuthService } from '../../infrastructure/auth/auth.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrl: './add-service.component.css'
})
export class AddServiceComponent {
  
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
    images: new FormControl ([], [Validators.required]),
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
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = () => {
          this.selectedFiles.push({ file, preview: reader.result });
        };
        reader.readAsDataURL(file);
        this.serviceForm.get('images')?.clearValidators();
      }
    } else {
      this.serviceForm.get('images')?.setValidators([Validators.required]);
    }
    this.serviceForm.controls['images'].setValue(this.selectedFiles);
    this.serviceForm.controls['images'].updateValueAndValidity();
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

      if (this.serviceForm.get('serviceType')?.value === 'fixed') {
        newService.minReservationTime = this.serviceForm.get('duration').value;
        newService.maxReservationTime = null;
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
