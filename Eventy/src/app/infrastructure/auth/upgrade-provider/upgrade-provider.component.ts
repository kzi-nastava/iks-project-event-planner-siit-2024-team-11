import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import { User } from '../../../user-management/model/users.model';
import { ErrorDialogComponent } from '../../../shared/error-dialog/error-dialog.component';
import { InvalidInputDataDialogComponent } from '../../../shared/invalid-input-data-dialog/invalid-input-data-dialog.component';
import { AuthService } from '../auth.service';
import { UpgradeProfileData } from '../model/upgrade-profile.model';
import { SuccessfulDialogComponent } from '../../../shared/successful-dialog/successful-dialog.component';

@Component({
  selector: 'app-upgrade-provider',
  templateUrl: './upgrade-provider.component.html',
  styleUrl: './upgrade-provider.component.css'
})
export class UpgradeProviderComponent {
  @Input() user: User;
  registerForm: FormGroup;
  public pictureIndex: number = 0;

  constructor(private authService: AuthService, private dialog: MatDialog, private router: Router) {
    this.registerForm = new FormGroup({
      profilePictures: new FormControl(['data:image/png;base64,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']),
      email: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.email]),
      companyName: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      address: new FormControl({ value: '', disabled: true }, [Validators.required]),
      phoneNumber: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        Validators.pattern(
          '^(\\+?\\d{1,4}[-.\\s]?)?(\\(?\\d{1,4}\\)?[-.\\s]?)?(\\d{1,4}[-.\\s]?){1,4}\\d{1,4}$'
        ),
      ]),
    });
  }

  ngOnInit(): void {
    this.registerForm.patchValue({
      profilePictures: ['upgrade_profile/solution_provider_profile_picture.png'],
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
        accountType: "SOLUTIONS PROVIDER",
        firstName: null,
        lastName: null,
        companyName: this.registerForm.controls['companyName'].value,
        description: this.registerForm.controls['description'].value,
        profilePictures: this.registerForm.controls['profilePictures'].value
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

  onFilesSelected(event: Event): void {
    const input: HTMLInputElement = event.target as HTMLInputElement;

    if (input.files) {
      let newPictures: string[] = []; // Initialize an empty array for pictures

      // Process all selected files
      const fileReaders: Promise<void>[] = Array.from(input.files).map((file: File) => {
        return new Promise<void>((resolve) => {
          const reader: FileReader = new FileReader();
          reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target && e.target.result) {
              newPictures.push(e.target.result as string);
            }
            resolve(); // Resolve when the file is processed
          };
          reader.readAsDataURL(file);
        });
      });

      // Wait for all files to be processed
      Promise.all(fileReaders).then(() => {
        if (newPictures.length === 0) {
          newPictures.push('upgrade_profile/solution_provider_profile_picture.png');
        }
        this.registerForm.controls['profilePictures'].setValue(newPictures);
        this.pictureIndex = 0;
      });
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
