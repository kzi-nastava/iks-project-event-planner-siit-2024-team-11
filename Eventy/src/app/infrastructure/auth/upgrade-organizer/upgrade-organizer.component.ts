import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from '../../../user-management/model/users.model';
import { ErrorDialogComponent } from '../../../shared/error-dialog/error-dialog.component';
import { UpgradeProfileData } from '../model/upgrade_profile.model';
import { AuthService } from '../auth.service';
import { InvalidInputDataDialogComponent } from '../../../shared/invalid-input-data-dialog/invalid-input-data-dialog.component';

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
      profilePicture: new FormControl('upgrade_profile/event_organiser_profile_picture.png'),
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
          this.dialog.open(InvalidInputDataDialogComponent, {
          data : {
            title: "Confirmation needed!",
            message: response
          }
        }).afterClosed().subscribe(() => this.router.navigate(['']));
        },
        error: (err) => {
          let errorMessage =  "Invalid registration data."; // default message
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
