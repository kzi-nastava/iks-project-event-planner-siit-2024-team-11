import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ICategory} from '../model/events.model';

@Component({
  selector: 'app-create-event-type',
  templateUrl: './create-event-type.component.html',
  styleUrl: './create-event-type.component.css'
})
export class CreateEventTypeComponent {
  eventTypeFormGroup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    recommendedCategories: new FormControl([], Validators.required),
  });

  categories: ICategory[] = [
    {
      name: "Music",
      description: "Great atmosphere and ambient at your event through MUSIC!"
    },
    {
      name: "Food",
      description: "Let your guests eat well!"
    }
  ];
  categoryInputFormControl: FormControl = new FormControl('', Validators.required);

  addEvent(): void {

  }

  addCategory(): void {
    for(let category of this.eventTypeFormGroup.controls['recommendedCategories'].value) {
      if(category === this.categoryInputFormControl.value) {
        return;
      }
    }

    if(this.categoryInputFormControl.value) {
      this.eventTypeFormGroup.controls['recommendedCategories'].setValue([
        ...(this.eventTypeFormGroup.controls['recommendedCategories'].value), this.categoryInputFormControl.value
      ]);
      this.categoryInputFormControl.reset();
      this.categoryInputFormControl.setErrors(null);
    }
  }
}
