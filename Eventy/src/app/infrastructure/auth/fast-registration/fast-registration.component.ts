import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {UserService} from '../../../user-management/user.service';
import {MatDialog} from '@angular/material/dialog';
import {InvalidInputDataDialogComponent} from '../../../shared/invalid-input-data-dialog/invalid-input-data-dialog.component';
import {Router} from '@angular/router';
import { ErrorDialogComponent } from '../../../shared/error-dialog/error-dialog.component';

interface ButtonClasses {
  "role-button" : boolean,
  "not-selected-button" : boolean
}

@Component({
  selector: 'app-fast-registration',
  templateUrl: './fast-registration.component.html',
  styleUrl: './fast-registration.component.css'
})
export class FastRegistrationComponent {
  email: string = "tactac123@gmail.com"
  registerForm : FormGroup = new FormGroup({
    profilePicture: new FormControl('ProfilePicture.png'),
    email : new FormControl({value: this.email, disabled: true}, [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required]),
    confirmedPassword : new FormControl('', [Validators.required, this.passwordMatching()]),
    address : new FormControl('', [Validators.required]),
    phoneNumber : new FormControl('', [Validators.required, Validators.pattern("^(\\+?\\d{1,4}[-.\\s]?)?(\\(?\\d{1,4}\\)?[-.\\s]?)?(\\d{1,4}[-.\\s]?){1,4}\\d{1,4}$")])
  });
  @ViewChild('profilePictureInput') fileInput!: ElementRef<HTMLInputElement>;


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
      this.dialog.open(ErrorDialogComponent, {
        width: '400px',
        disableClose: true, // prevents closing by clicking outside
        backdropClass: 'blurred_backdrop_dialog',
        data: {
          title: 'Input Error',
          message: 'Please make sure that all inputs are valid before registration.',
        },
      });

      this.registerForm.updateValueAndValidity();
      this.registerForm.markAllAsTouched();
    } else {
      // we can add normal register function here, or something specific, we will see
      //this.userService.register(this.registerForm.value);
      this.router.navigate(['']);
    }
  }

  onFileSelected(event: Event): void {
    const fileInput: HTMLInputElement = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file: File = fileInput.files[0];

      const reader: FileReader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => this.registerForm.controls['profilePicture'].setValue(e.target?.result);
      reader.readAsDataURL(file);
    }
  }

  pickProfilePicture() : void {
    this.fileInput.nativeElement.click();
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
