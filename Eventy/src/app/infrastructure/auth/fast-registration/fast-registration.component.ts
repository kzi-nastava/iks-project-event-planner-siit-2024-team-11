import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorDialogComponent } from '../../../shared/error-dialog/error-dialog.component';
import { FastRegistrationData } from '../model/fast-registration.model';
import { AuthService } from '../auth.service';
import { InvalidInputDataDialogComponent } from '../../../shared/invalid-input-data-dialog/invalid-input-data-dialog.component';
import { SuccessfulDialogComponent } from '../../../shared/successful-dialog/successful-dialog.component';

@Component({
  selector: 'app-fast-registration',
  templateUrl: './fast-registration.component.html',
  styleUrl: './fast-registration.component.css'
})
export class FastRegistrationComponent {
  encryptedEmail: string = "";
  email: string = "";
  registerForm : FormGroup = new FormGroup({
    email : new FormControl({value: this.email, disabled: true}, [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required]),
    confirmedPassword : new FormControl('', [Validators.required, this.passwordMatching()]),
    address : new FormControl('', [Validators.required]),
    phoneNumber : new FormControl('', [Validators.required, Validators.pattern("^(\\+?\\d{1,4}[-.\\s]?)?(\\(?\\d{1,4}\\)?[-.\\s]?)?(\\d{1,4}[-.\\s]?){1,4}\\d{1,4}$")])
  });
  @ViewChild('profilePictureInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(private authService: AuthService, private dialog: MatDialog, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.encryptedEmail = params['value'] || ''; // Assign the 'value' query param to email
    });
  }

  ngOnInit() {
    this.authService.decryptEmail(this.encryptedEmail).subscribe({
      next: (response: string) => {
        this.email = response;
        this.registerForm.controls['email'].setValue(response); // 
      },
      error: () => {
        this.email = "example@gmail.com";
        this.registerForm.controls['email'].setValue("example@gmail.com"); // 
      }
    });
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
      const fastRegisterData: FastRegistrationData = {
        encryptedEmail: this.encryptedEmail,
        password: this.registerForm.controls["password"].value,
        confirmedPassword: this.registerForm.controls["confirmedPassword"].value,
        address: this.registerForm.controls["address"].value,
        phoneNumber: this.registerForm.controls["phoneNumber"].value,
      }

      this.authService.fastRegister(fastRegisterData).subscribe({
        next: (response: string) => {
          this.dialog.open(SuccessfulDialogComponent, {
            width: '400px',
            disableClose: true, // Prevent closing by clicking outside
            backdropClass: 'blurred_backdrop_dialog',
            data: {
              title: "Confirmation Needed",
              message: response, 
            },     
          }).afterClosed().subscribe(() => this.router.navigate(['']));
        },
        error: (err) => {
        console.log(err)
          let errorMessage = "Invalid registration data."; // default message
          if (err?.error !== null) {
            let msg = err.error[0]
            const parts = msg.split(":"); 
            if (parts[1] !== null) {
              errorMessage = parts[1]?.trim();
            }    
          }

          this.dialog.open(ErrorDialogComponent, {
            width: '400px',
            disableClose: true, // Prevent closing by clicking outside
            backdropClass: 'blurred_backdrop_dialog',
            data: {
              title: 'Registration Failed',
              message: errorMessage, 
            },
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
