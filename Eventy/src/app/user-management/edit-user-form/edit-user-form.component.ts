import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {
  InvalidInputDataDialogComponent
} from '../../shared/invalid-input-data-dialog/invalid-input-data-dialog.component';
import {Organizer} from '../model/users.model';

@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrl: './edit-user-form.component.css'
})
export class EditUserFormComponent implements OnInit {
  @Input()
  user: Organizer;

  editForm : FormGroup;

  constructor(private userService: UserService, private dialog: MatDialog, private router: Router) {

  }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      profilePicture: new FormControl(this.user.profilePicture || 'ProfilePicture.png'),
      email : new FormControl({value: this.user.email, disabled: true }),
      oldPassword: new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required]),
      confirmedPassword : new FormControl('', [Validators.required, this.passwordMatching()]),
      firstName : new FormControl(this.user.firstName, [Validators.required]),
      lastName : new FormControl(this.user.lastName, [Validators.required]),
      address : new FormControl(this.user.address, [Validators.required]),
      phoneNumber : new FormControl(this.user.phoneNumber, [Validators.required, Validators.pattern("^(\\+?\\d{1,4}[-.\\s]?)?(\\(?\\d{1,4}\\)?[-.\\s]?)?(\\d{1,4}[-.\\s]?){1,4}\\d{1,4}$")])
    });
  }

  private passwordMatching(): ValidatorFn {
    return (): ValidationErrors | null => {
      if(this.editForm) {
        return this.editForm.controls['password'].value === this.editForm.controls['confirmedPassword'].value ? null : { match: true };
      }

      return null;
    };
  }

  confirmEdit(): void {
    if(this.editForm.invalid) {
      this.dialog.open(InvalidInputDataDialogComponent, {
        data : {
          title: "Invalid input",
          message: "Invalid edit data"
        }
      });

      this.editForm.updateValueAndValidity();
      this.editForm.markAllAsTouched();
    } else {
      // edit method from service
      this.router.navigate(['/users', this.user.firstName + " " + this.user.lastName]);
    }
  }

  onFileSelected(event: Event): void {
    const fileInput: HTMLInputElement = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file: File = fileInput.files[0];

      const reader: FileReader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => this.editForm.controls['profilePicture'].setValue(e.target?.result);
      reader.readAsDataURL(file);
    }
  }

  @ViewChild('profilePictureInput') fileInput!: ElementRef<HTMLInputElement>;

  pickProfilePicture() : void {
    this.fileInput.nativeElement.click();
  }

  resetValue(targetField: string): void {
    if(this.editForm.controls.hasOwnProperty(targetField)) {
      let fieldsWithoutErrors: string[] = [];

      for(let field in this.editForm.controls) {
        if(field !== targetField && !this.editForm.controls[field].touched) {
          fieldsWithoutErrors.push(field);
        }
      }

      this.editForm.controls[targetField].setValue('');

      for(let field of fieldsWithoutErrors) {
        this.editForm.controls[field].setErrors(null);
      }
    }
  }
}
