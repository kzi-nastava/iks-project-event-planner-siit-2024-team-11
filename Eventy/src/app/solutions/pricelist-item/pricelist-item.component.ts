import { Component, Input } from '@angular/core';
import { SolutionsService } from '../services/solutions/solutions-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PricelistItem } from '../model/pricelist-item.model';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-pricelist-item',
  templateUrl: './pricelist-item.component.html',
  styleUrl: './pricelist-item.component.css'
})
export class PricelistItemComponent {
  editMode: boolean = false;

  @Input() item: PricelistItem

  form = new FormGroup({
    price: new FormControl(null, [Validators.required, Validators.min(0)]),
    discount: new FormControl (null, [Validators.required, Validators.min(0), Validators.max(100)])
  })

  constructor(private solutionsService: SolutionsService, private dialog: MatDialog) {}

  beginEditMode(): void {
    this.form.get('price')?.setValue(this.item.price);
    this.form.get('discount')?.setValue(this.item.discount);
    this.editMode = true;
  }

  confirmChanges(): void {
    if (this.form.valid) {
      let newItem: PricelistItem = {
        id: this.item.id,
        name: this.item.name,
        price: this.form.get('price').value,
        discount: this.form.get('discount').value
      }
      this.solutionsService.updatePrice(newItem).subscribe({
        next: (response: PricelistItem) => {
          this.item = response;
          this.editMode = false;
        },
        error: (err: any) => {
          this.dialog.open(ErrorDialogComponent, {
            data : {
              title: "Error!",
              message: "Unexpected error when updating!"
            }
          });
        } 
      })
    } else {
      this.dialog.open(ErrorDialogComponent, {
        data : {
          title: "Error!",
          message: "The values are invalid!"
        }
      });
    }
    
  }

  revertChanges(): void {
    this.editMode = false;
  }
}
