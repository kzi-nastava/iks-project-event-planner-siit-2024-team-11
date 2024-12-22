import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {
  InvalidInputDataDialogComponent
} from '../../shared/invalid-input-data-dialog/invalid-input-data-dialog.component';
import {User} from '../model/users.model';

@Component({
  selector: 'app-edit-provider-form',
  templateUrl: './edit-provider-form.component.html',
  styleUrl: './edit-provider-form.component.css'
})
export class EditProviderFormComponent implements OnInit{
  @Input()
  user: User;

  editForm: FormGroup;

  public pictureIndex: number = 0;

  constructor(private userService: UserService, private dialog: MatDialog, private router: Router) {

  }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      profilePictures: new FormControl(this.user.profilePictures || ['ProfilePicture.png']),
      email: new FormControl({value: this.user.email, disabled: true }),
      oldPassword: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmedPassword: new FormControl('', [Validators.required, this.passwordMatching()]),
      name: new FormControl({value: this.user.name, disabled: true }),
      description: new FormControl(this.user.description, [Validators.required]),
      address: new FormControl(this.user.address, [Validators.required]),
      phoneNumber: new FormControl(this.user.phoneNumber, [Validators.required, Validators.pattern("^(\\+?\\d{1,4}[-.\\s]?)?(\\(?\\d{1,4}\\)?[-.\\s]?)?(\\d{1,4}[-.\\s]?){1,4}\\d{1,4}$")])
    });
  }

  private passwordMatching(): ValidatorFn {
    return (): ValidationErrors | null => {
      if(this.editForm) {
        return this.editForm.controls['password'].value === this.editForm.controls['confirmedPassword'].value ? null : { match: true };
      }

      return null;
    };
  }

  confirmEdit(): void {
    if(this.editForm.invalid) {
      this.dialog.open(InvalidInputDataDialogComponent, {
        data : {
          title: "Invalid input",
          message: "Invalid edit data"
        }
      });

      this.editForm.updateValueAndValidity();
      this.editForm.markAllAsTouched();
    } else {
      // service edit method
      this.router.navigate(['']);
    }
  }

  onFilesSelected(event: Event): void {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    if (input.files) {
      let newPictures : string[] = []; // Clear previous selection

      Array.from(input.files).forEach((file: File): void => {
        const reader: FileReader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>): void => {
          if (e.target) {
            newPictures.push(e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      });

      this.editForm.controls['profilePictures'].setValue(newPictures);
    }
  }

  @ViewChild('picturesPickerId') fileInput!: ElementRef<HTMLInputElement>;

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  nextPicture() : void {
    if(this.pictureIndex < this.editForm.value.profilePictures.length - 1) {
      this.pictureIndex++;
    }
  }

  previousPicture() : void {
    if(this.pictureIndex > 0) {
      this.pictureIndex--;
    }
  }

  resetValue(targetField: string): void {
    if(this.editForm.controls.hasOwnProperty(targetField)) {
      let fieldsWithoutErrors: string[] = [];

      for(let field in this.editForm.controls) {
        if(field !== targetField && !this.editForm.controls[field].touched) {
          fieldsWithoutErrors.push(field);
        }
      }

      this.editForm.controls[targetField].setValue('');

      for(let field of fieldsWithoutErrors) {
        this.editForm.controls[field].setErrors(null);
      }
    }
  }
}
