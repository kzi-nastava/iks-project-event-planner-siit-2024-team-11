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
    profilePicture: new FormControl('data:image/png;base64,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'),
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required]),
    confirmedPassword : new FormControl('', [Validators.required, this.passwordMatching()]),
    firstName : new FormControl('', [Validators.required]),
    lastName : new FormControl('', [Validators.required]),
    address : new FormControl('', [Validators.required]),
    phoneNumber : new FormControl('', [Validators.required, Validators.pattern("^\\+?[0-9]{1,4}?[-.\\s]?(\\(?\\d{1,5}\\)?[-.\\s]?)*\\d{1,6}$")])
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
      const {profilePicture, ...userData} = this.registerForm.value;
      let user: RegisterData = {
        ...userData,
        profilePictures: [this.registerForm.controls['profilePicture'].value]
      };

      this.authService.register(user).subscribe({
        next: (response: string) => {
          this.dialog.open(InvalidInputDataDialogComponent, {
          data : {
            title: "Confirmation needed!",
            message: response
          }
        }).afterClosed().subscribe(() => this.router.navigate(['']));
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
