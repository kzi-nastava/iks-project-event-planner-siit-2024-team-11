import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {MatDialog} from '@angular/material/dialog';
import {InvalidInputDataDialogComponent} from '../../shared/invalid-input-data-dialog/invalid-input-data-dialog.component';
import {Router} from '@angular/router';
import { User } from '../model/users.model';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-upgrade-organizer',
  templateUrl: './upgrade-organizer.component.html',
  styleUrl: './upgrade-organizer.component.css'
})
export class UpgradeOrganizerComponent {
  user: User;
  registerForm: FormGroup;

  constructor(private userService: UserService, private dialog: MatDialog, private router: Router) {

  }

  ngOnInit(): void {
    // Fetch the user data (assuming it's asynchronous)
    //this.userService.get(5).subscribe((user: User) => {
      this.user = this.userService.get(5);
  
      this.registerForm = new FormGroup({
        profilePicture: new FormControl('upgrade_profile/event_organiser_profile_picture.png'),
        email : new FormControl({value: this.user.email, disabled: true}, [Validators.required, Validators.email]),
        firstName : new FormControl('', [Validators.required]),
        lastName : new FormControl('', [Validators.required]),
        address : new FormControl({value: this.user.address, disabled: true}, [Validators.required]),
        phoneNumber : new FormControl({value: this.user.phoneNumber, disabled: true}, [Validators.required, Validators.pattern("^(\\+?\\d{1,4}[-.\\s]?)?(\\(?\\d{1,4}\\)?[-.\\s]?)?(\\d{1,4}[-.\\s]?){1,4}\\d{1,4}$")])
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
