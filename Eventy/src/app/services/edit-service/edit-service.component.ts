import { Component, ElementRef, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';  
import { EventTypeService } from '../../events/event-type.service';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { SolutionCategoryService } from '../../solutions/services/solutions/solution-category.service';
import { ServicesService } from '../services/services/services.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EventTypeCard } from '../../events/model/events.model';
import { Service, UpdateService } from '../model/services.model';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';
import { Category, Status } from '../../solutions/model/category.model';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrl: './edit-service.component.css'
})
export class EditServiceComponent {
  category: Category;
  serviceType: string = '';
  id: number = 0;
  allSolutionCategories: any[] = [];
  allEventTypes: EventTypeCard[] = [];
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
    isVisible: new FormControl(null),
    isAvailable: new FormControl(null)
  });

  constructor(private eventTypeService: EventTypeService, private solutionCategoryService: SolutionCategoryService, private route: ActivatedRoute,
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
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.eventTypeService.getActiveEventTypes().subscribe({
      next: (response: EventTypeCard[]) => {
        this.allEventTypes = response;
      }
    })

    this.servicesService.get(this.id).subscribe({
      next: (response: Service) => {
        this.serviceForm.patchValue({
          serviceCategory: response.category.name,
          name: response.name,
          description: response.description,
          specifics: response.specifics,
          serviceType: response.maxReservationTime === response.minReservationTime ? 'fixed' : 'variable',
          duration: response.maxReservationTime === response.minReservationTime ? response.minReservationTime : null,
          minDuration: response.maxReservationTime === response.minReservationTime ? null : response.minReservationTime,
          maxDuration: response.maxReservationTime === response.minReservationTime ? null : response.maxReservationTime,
          daysNoticeForReservation: response.reservationDeadline,
          daysNoticeForCancellation: response.cancellationDeadline,
          autoAccept: response.automaticReservationAcceptance,
          relevantEventTypes: response.relatedEventTypes.map(et => et.id),
          price: response.price,
          discount: response.discount,
          isVisible: response.isVisible,
          isAvailable: response.isAvailable
        })
        this.allSolutionCategories.push(response.category);
        this.category = response.category;

        response.imageUrls.forEach(url => {
          this.selectedFiles.push({preview: url})
        })

        this.serviceForm.controls['images'].setValue(this.selectedFiles);

        this.serviceForm.controls['serviceCategory'].disable();
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
        let updatedService: UpdateService = {
          id: this.id,
          name: this.serviceForm.get('name').value,
          description: this.serviceForm.get('description').value,
          price: this.serviceForm.get('price').value,
          discount: this.serviceForm.get('discount').value,
          imageUrls: this.selectedFiles.map(file => file.preview),
          relatedEventTypeIds: this.serviceForm.get('relevantEventTypes').value,
          specifics: this.serviceForm.get('specifics').value,
          minReservationTime: this.serviceForm.get('minDuration').value,
          maxReservationTime: this.serviceForm.get('maxDuration').value,
          reservationDeadline: this.serviceForm.get('daysNoticeForReservation').value,
          cancellationDeadline: this.serviceForm.get('daysNoticeForCancellation').value,
          automaticReservationAcceptance: this.serviceForm.get('autoAccept').value,
          isAvailable: this.serviceForm.get('isAvailable').value,
          isVisible: this.serviceForm.get('isVisible').value
        }
  
        if (this.serviceForm.get('serviceType')?.value === 'fixed') {
          updatedService.minReservationTime = this.serviceForm.get('duration').value;
          updatedService.maxReservationTime = this.serviceForm.get('duration').value;
        }
  
        this.servicesService.update(updatedService).subscribe({
          next: (response: Service) => {
            this.router.navigate(["solutions", this.id]);
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
