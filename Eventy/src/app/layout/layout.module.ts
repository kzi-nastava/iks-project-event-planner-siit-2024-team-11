import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavDrawerComponent } from './nav-drawer/nav-drawer.component';
import { FooterComponent } from './footer/footer.component';
import {InvalidInputDataDialogComponent} from './invalid-input-data-dialog/invalid-input-data-dialog.component';



@NgModule({
  declarations: [
    NavBarComponent,
    HomeComponent,
    NavDrawerComponent,
    FooterComponent,
    InvalidInputDataDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
    exports: [NavBarComponent, NavDrawerComponent, FooterComponent, InvalidInputDataDialogComponent]
})
export class LayoutModule { }
