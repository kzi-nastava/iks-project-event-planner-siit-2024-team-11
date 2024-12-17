import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {MatDialog} from '@angular/material/dialog';
import {InvalidInputDataDialogComponent} from '../../shared/invalid-input-data-dialog/invalid-input-data-dialog.component';
import {Router} from '@angular/router';
import { User } from '../model/users.model';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-upgrade-provider',
  templateUrl: './upgrade-provider.component.html',
  styleUrl: './upgrade-provider.component.css'
})
export class UpgradeProviderComponent {
  user: User;
  registerForm: FormGroup;
  public pictureIndex: number = 0;

  constructor(private userService: UserService, private dialog: MatDialog, private router: Router) {

  }

  ngOnInit(): void {
    // Fetch the user data (assuming it's asynchronous)
    //this.userService.get(5).subscribe((user: User) => {
      this.user = this.userService.get(5);
  
      this.registerForm = new FormGroup({
        profilePictures: new FormControl(['upgrade_profile/solution_provider_profile_picture.png']),
        email: new FormControl({value: this.user.email, disabled: true}, [Validators.required, Validators.email]),
        name: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        address: new FormControl({value: this.user.address, disabled: true}, [Validators.required]),
        phoneNumber: new FormControl({value: this.user.phoneNumber, disabled: true}, [Validators.required, Validators.pattern("^(\\+?\\d{1,4}[-.\\s]?)?(\\(?\\d{1,4}\\)?[-.\\s]?)?(\\d{1,4}[-.\\s]?){1,4}\\d{1,4}$")])
      });
    //});
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
      this.userService.register(this.registerForm.value);
      this.router.navigate(['']);
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
