import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {MatDialog} from '@angular/material/dialog';
import {InvalidInputDataDialogComponent} from '../../shared/invalid-input-data-dialog/invalid-input-data-dialog.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-provider',
  templateUrl: './register-provider.component.html',
  styleUrl: './register-provider.component.css'
})
export class RegisterProviderComponent {
  registerForm: FormGroup = new FormGroup({
    profilePictures: new FormControl(['ProfilePicture.png']),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmedPassword: new FormControl('', [Validators.required, this.passwordMatching()]),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern("^(\\+?\\d{1,4}[-.\\s]?)?(\\(?\\d{1,4}\\)?[-.\\s]?)?(\\d{1,4}[-.\\s]?){1,4}\\d{1,4}$")])
  });

  public pictureIndex: number = 0;

  constructor(private userService: UserService, private dialog: MatDialog, private router: Router) {

  }

  private passwordMatching(): ValidatorFn {
    return (): ValidationErrors | null => {
      if(this.registerForm) {
        return this.registerForm.controls['password'].value === this.registerForm.controls['confirmedPassword'].value ? null : { match: true };
      }

      return null;
    };
  }

  register(): void {
    if(this.registerForm.invalid) {
      this.dialog.open(InvalidInputDataDialogComponent, {
        data : {
          title: "Invalid input",
          message: "Invalid input data"
        }
      });

      this.registerForm.updateValueAndValidity();
      this.registerForm.markAllAsTouched();
    } else {
      this.userService.register(this.registerForm.value);
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

      this.registerForm.controls['profilePictures'].setValue(newPictures);
    }
  }

  @ViewChild('picturesPickerId') fileInput!: ElementRef<HTMLInputElement>;

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  nextPicture() : void {
    if(this.pictureIndex < this.registerForm.value.profilePictures.length - 1) {
      this.pictureIndex++;
    }
  }

  previousPicture() : void {
    if(this.pictureIndex > 0) {
      this.pictureIndex--;
    }
  }

  resetValue(targetField: string): void {
    if(this.registerForm.controls.hasOwnProperty(targetField)) {
      let fieldsWithoutErrors: string[] = [];

      for(let field in this.registerForm.controls) {
        if(field !== targetField && !this.registerForm.controls[field].touched) {
          fieldsWithoutErrors.push(field);
        }
      }

      this.registerForm.controls[targetField].setValue('');

      for(let field of fieldsWithoutErrors) {
        this.registerForm.controls[field].setErrors(null);
      }
    }
  }
}
