import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EventTypeService} from '../event-type.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryWithId} from '../../solutions/model/category-with-id.model';
import {EventType, EventTypeWithActivity} from '../model/events.model';
import {SolutionCategoryService} from '../../solutions/services/solutions/solution-category.service';
import {ErrorDialogComponent} from '../../shared/error-dialog/error-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-event-type',
  templateUrl: './edit-event-type.component.html',
  styleUrl: './edit-event-type.component.css'
})
export class EditEventTypeComponent {
  eventTypeFormGroup: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    recommendedSolutionCategoriesIds: new FormControl([], Validators.required),
  });

  categories: CategoryWithId[] = [];

  categoryInputFormControl: FormControl = new FormControl(null, Validators.required);

  id: number;

  constructor(private eventTypeService: EventTypeService, private router: Router, private route: ActivatedRoute,
              private categoryService: SolutionCategoryService, private dialog: MatDialog) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.eventTypeService.get(this.id).subscribe({
      next: (type: EventTypeWithActivity) => {
        this.eventTypeFormGroup.controls['id'].setValue(type['id']);
        this.eventTypeFormGroup.controls['name'].setValue(type['name']);
        this.eventTypeFormGroup.controls['description'].setValue(type['description']);
        this.eventTypeFormGroup.controls['recommendedSolutionCategoriesIds'].setValue(type['recommendedSolutionCategories'].map((category: CategoryWithId) => category.id));
      }
    });

    this.categoryService.getAll().subscribe({
      next: (categories: CategoryWithId[]) => {
       this.categories = categories;
      }
    });
  }


  editEvent(): void {
    if(this.eventTypeFormGroup.valid){
      this.eventTypeService.update(this.eventTypeFormGroup.value).subscribe({
        next: (eventType: EventType) => {
          this.router.navigate(['/event-types']);
        }
      });
    } else {
      this.dialog.open(ErrorDialogComponent, {
        width: '400px',
        disableClose: true, // prevents closing by clicking outside
        backdropClass: 'blurred_backdrop_dialog',
        data: {
          title: 'Input Error',
          message: 'Please make sure that all inputs are valid before adding an event type.',
        },
      });
    }
  }

  addCategory(): void {
    for(let categoryId of this.eventTypeFormGroup.controls['recommendedSolutionCategoriesIds'].value) {
      if(this.findCategoryName(categoryId) === this.categoryInputFormControl.value.name) {
        this.dialog.open(ErrorDialogComponent, {
          width: '400px',
          disableClose: true, // prevents closing by clicking outside
          backdropClass: 'blurred_backdrop_dialog',
          data: {
            title: 'Input Error',
            message: 'Category already added!',
          },
        });
        return;
      }
    }

    if(this.categoryInputFormControl.value) {
      this.eventTypeFormGroup.controls['recommendedSolutionCategoriesIds'].setValue([
        ...(this.eventTypeFormGroup.controls['recommendedSolutionCategoriesIds'].value), this.categoryInputFormControl.value
      ]);
      this.categoryInputFormControl.reset();
      this.categoryInputFormControl.setErrors(null);
    }
  }

  removeCategory(id: number): void {
    let newRecommendedCategoryList: number[] = [];

    for(let categoryId of this.eventTypeFormGroup.controls['recommendedSolutionCategoriesIds'].value) {
      if(categoryId !== id) {
        newRecommendedCategoryList.push(categoryId);
      }
    }

    this.eventTypeFormGroup.controls['recommendedSolutionCategoriesIds'].setValue(newRecommendedCategoryList);
  }

  findCategoryName(id: number): string {
    for(let category of this.categories) {
      if(category.id === id){
        return category.name;
      }
    }

    return null;
  }
}
