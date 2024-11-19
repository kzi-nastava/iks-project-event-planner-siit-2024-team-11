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
    serviceType: new FormControl('', Validators.required)
  });

  constructor() {

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
    alert("SERVICE CREATED")
  }
}