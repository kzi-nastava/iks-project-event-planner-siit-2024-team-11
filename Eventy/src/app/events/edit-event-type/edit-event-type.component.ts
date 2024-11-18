import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ICategory, IEventType} from '../model/events.model';
import {EventTypeService} from '../event-type.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-event-type',
  templateUrl: './edit-event-type.component.html',
  styleUrl: './edit-event-type.component.css'
})
export class EditEventTypeComponent {
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

  categoryInputFormControl: FormControl = new FormControl(null, Validators.required);

  name: string;

  constructor(private eventTypeService: EventTypeService, private router: Router, private route: ActivatedRoute) {
    this.name = this.route.snapshot.paramMap.get('id') || '';

    let type: IEventType = this.eventTypeService.get(this.name);

    this.eventTypeFormGroup.controls['name'].setValue(type['name']);
    this.eventTypeFormGroup.controls['description'].setValue(type['description']);
    this.eventTypeFormGroup.controls['recommendedCategories'].setValue(type['recommendedCategories']);
  }


  editEvent(): void {
    if(this.eventTypeFormGroup.valid){
      this.eventTypeService.update(this.eventTypeFormGroup.value);
      this.router.navigate(['/event-types']);
    } else {
      // dialog pop up?
    }
  }

  addCategory(): void {
    for(let category of this.eventTypeFormGroup.controls['recommendedCategories'].value) {
      if(category.name === this.categoryInputFormControl.value.name) {
        //dialog pop up?
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

  removeCategory(categoryName: string): void {
    let newRecommendedCategoryList: ICategory[] = [];

    for(let category of this.eventTypeFormGroup.controls['recommendedCategories'].value) {
      if(category.name !== categoryName) {
        newRecommendedCategoryList.push(category);
      }
    }

    this.eventTypeFormGroup.controls['recommendedCategories'].setValue(newRecommendedCategoryList);
  }
}
