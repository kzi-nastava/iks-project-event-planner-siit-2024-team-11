import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../infrastructure/material/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {DatepickerModule} from '../infrastructure/datepicker/datepicker.module';
import { ProductCardComponent } from './product-card/product-card.component';
import {RouterModule} from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import {MatCheckbox} from '@angular/material/checkbox';



@NgModule({
  declarations: [
    ProductCardComponent,
    AddProductComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    DatepickerModule,
    RouterModule,
    MatCheckbox
  ],
  exports: [
    ProductCardComponent,
  ]
})
export class ProductsModule { }
