import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {UserService} from '../../../user-management/user.service';
import {MatDialog} from '@angular/material/dialog';
import {InvalidInputDataDialogComponent} from '../../../shared/invalid-input-data-dialog/invalid-input-data-dialog.component';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {RegisterData} from '../model/register.model';
import {AuthResponse} from '../model/auth-response.model';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-register-organizer',
  templateUrl: './register-organizer.component.html',
  styleUrl: './register-organizer.component.css'
})
export class RegisterOrganizerComponent {
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

  constructor(private authService: AuthService, private dialog: MatDialog, private router: Router) {

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
    if(this.registerForm.invalid || this.registerForm.controls['password'].value !== this.registerForm.controls['confirmedPassword'].value) {
      this.dialog.open(InvalidInputDataDialogComponent, {
          data : {
            title: "Invalid input",
            message: "Invalid registration data"
          }
      });

      this.registerForm.updateValueAndValidity();
      this.registerForm.markAllAsTouched();
    } else {
      let user: RegisterData = this.registerForm.value as RegisterData;
      user.profilePictures = [this.registerForm.controls['profilePicture'].value];
      this.authService.register(user).subscribe({
        next: (response: string) => {
          this.dialog.open(InvalidInputDataDialogComponent, {
          data : {
            title: "Confirmation needed!",
            message: response
          }
        }).close(this.router.navigate(['']));
        },
        error: () => {
          this.dialog.open(InvalidInputDataDialogComponent, {
            data : {
              title: "Invalid input!",
              message: "Invalid registration data"
            }
          });
        }
      });
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
