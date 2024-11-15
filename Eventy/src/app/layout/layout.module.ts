import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavDrawerComponent } from './nav-drawer/nav-drawer.component';
import { FooterComponent } from './footer/footer.component';
import { EventsModule } from '../events/events.module';
import { EventCardComponent } from '../events/event-card/event-card.component';



@NgModule({
  declarations: [
    NavBarComponent,
    HomeComponent,
    NavDrawerComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    EventsModule,
  ],
    exports: [NavBarComponent, NavDrawerComponent, FooterComponent]
})
export class LayoutModule { }
