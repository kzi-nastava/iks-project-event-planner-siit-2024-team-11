import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {
  InvalidInputDataDialogComponent
} from '../../shared/invalid-input-data-dialog/invalid-input-data-dialog.component';

@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrl: './edit-user-form.component.css'
})
export class EditUserFormComponent {
  registerForm : FormGroup = new FormGroup({
    profilePicture: new FormControl('ProfilePicture.png'),
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required]),
    confirmedPassword : new FormControl('', [Validators.required, this.passwordMatching()]),
    firstName : new FormControl('', [Validators.required]),
    lastName : new FormControl('', [Validators.required]),
    address : new FormControl('', [Validators.required]),
    phoneNumber : new FormControl('', [Validators.required, Validators.pattern("^(\\+?\\d{1,4}[-.\\s]?)?(\\(?\\d{1,4}\\)?[-.\\s]?)?(\\d{1,4}[-.\\s]?){1,4}\\d{1,4}$")])
  });

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
          message: "Invalid registration data"
        }
      });

      this.registerForm.updateValueAndValidity();
      this.registerForm.markAllAsTouched();
    } else {
      this.userService.register(this.registerForm.value);
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

  @ViewChild('profilePictureInput') fileInput!: ElementRef<HTMLInputElement>;

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
