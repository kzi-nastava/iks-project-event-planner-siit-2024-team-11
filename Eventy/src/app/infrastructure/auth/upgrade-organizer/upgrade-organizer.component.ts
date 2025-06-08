import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from '../../../user-management/model/users.model';
import { ErrorDialogComponent } from '../../../shared/error-dialog/error-dialog.component';
import { UpgradeProfileData } from '../model/upgrade-profile.model';
import { AuthService } from '../auth.service';
import { InvalidInputDataDialogComponent } from '../../../shared/invalid-input-data-dialog/invalid-input-data-dialog.component';
import { SuccessfulDialogComponent } from '../../../shared/successful-dialog/successful-dialog.component';

@Component({
  selector: 'app-upgrade-organizer',
  templateUrl: './upgrade-organizer.component.html',
  styleUrl: './upgrade-organizer.component.css'
})
export class UpgradeOrganizerComponent {
  @Input() user: User;
  registerForm: FormGroup;

  constructor(private authService: AuthService, private dialog: MatDialog, private router: Router) {
    this.registerForm = new FormGroup({
      profilePicture: new FormControl('data:image/png;base64,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'),
      email: new FormControl({ value: '', disabled: true },[Validators.required, Validators.email]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      address: new FormControl({ value: '', disabled: true },[Validators.required]),
      phoneNumber: new FormControl({ value: '', disabled: true },[
        Validators.required,
        Validators.pattern(
          '^(\\+?\\d{1,4}[-.\\s]?)?(\\(?\\d{1,4}\\)?[-.\\s]?)?(\\d{1,4}[-.\\s]?){1,4}\\d{1,4}$'
        ),
      ]),
    });
  }

  ngOnInit(): void {
    this.registerForm.patchValue({
      profilePicture: 'upgrade_profile/event_organiser_profile_picture.png',
      email: this.user.email,
      address: this.user.address,
      phoneNumber: this.user.phoneNumber,
    });
  }

  register(): void {
    if(this.registerForm.invalid) {
      this.dialog.open(ErrorDialogComponent, {
        width: '400px',
        disableClose: true, // prevents closing by clicking outside
        backdropClass: 'blurred_backdrop_dialog',
        data: {
          title: 'Input Error',
          message: 'Please make sure that all inputs are valid before upgrading profile.',
        },
      });

      this.registerForm.updateValueAndValidity();
      this.registerForm.markAllAsTouched();

    } else {
      const upgradeProfileData: UpgradeProfileData = {
        email: this.user.email,
        accountType: "EVENT ORGANIZER",
        firstName: this.registerForm.controls['firstName'].value,
        lastName: this.registerForm.controls['lastName'].value,
        companyName: null,
        description: null,
        profilePictures: [this.registerForm.controls['profilePicture'].value]
      }

      this.authService.upgradeProfile(upgradeProfileData).subscribe({
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
              title: 'Upgrade Failed',
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
