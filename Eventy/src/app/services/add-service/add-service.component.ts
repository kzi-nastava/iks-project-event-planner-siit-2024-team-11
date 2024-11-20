import { Component, ElementRef, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';  

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrl: './add-service.component.css'
})
export class AddServiceComponent {
  serviceType: string = '';
  categoryList: Array<string> = ['Event type 1', 'Event type 2', 'Event type 3', 'Event type 4'];
  selectedFiles: Array<any> = [];
  checked: boolean = false;

  serviceForm = new FormGroup({
    serviceCategory: new FormControl('', [Validators.required]),
    name: new FormControl ('', [Validators.required]),
    description: new FormControl ('', [Validators.required]),
    specifics: new FormControl ('', [Validators.required]),
    serviceType: new FormControl ('', [Validators.required]),
    duration: new FormControl (null, [Validators.required]),
    minDuration: new FormControl (null, [Validators.required]),
    maxDuration: new FormControl (null, [Validators.required]),
    daysNoticeForReservation: new FormControl (null, [Validators.required]),
    daysNoticeForCancellation: new FormControl (null, [Validators.required]),
    autoAccept: new FormControl ([false]),
    relevantEventTypes: new FormControl ([], [Validators.required]),
    price: new FormControl (null, [Validators.required, Validators.min(0)]),
    discount: new FormControl (null, [Validators.required, Validators.min(0), Validators.max(100)]),
    images: new FormControl (null),
  });

  constructor() {
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
      alert("SERVICE CREATED");
    }
    else {
      alert("NOT EVERYTHING IS VALID");
    }
  }
}
