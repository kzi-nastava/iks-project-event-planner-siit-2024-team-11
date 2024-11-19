import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {MatDialog} from '@angular/material/dialog';
import {InvalidInputDataDialogComponent} from '../../layout/invalid-input-data-dialog/invalid-input-data-dialog.component';

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

  constructor(private userService: UserService, private dialog: MatDialog) {

  }

  private passwordMatching(): ValidatorFn {
    return (): ValidationErrors | null => {
      if(this.registerForm) {
        return this.registerForm.controls['password'].value === this.registerForm.controls['confirmedPassword'].value ? null : { match: true };
      }

      return null;
    };
  }

  register() {
    if(this.registerForm.invalid) {
      this.dialog.open(InvalidInputDataDialogComponent, {
          data : {
            title: "Invalid input",
            message: "Invalid input data"
          }
      });
    } else {
      this.userService.register(this.registerForm.value);
    }
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];

      // Preview the image by creating a temporary URL
      const reader = new FileReader();
      reader.onload = e => this.registerForm.controls['profilePicture'].setValue(e.target?.result);
      reader.readAsDataURL(file);
    }
  }

  @ViewChild('profilePictureInput') fileInput!: ElementRef<HTMLInputElement>;

  pickProfilePicture() : void {
    this.fileInput.nativeElement.click();
  }
}
