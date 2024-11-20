import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LayoutModule } from './layout/layout.module';
import {MaterialModule} from './infrastructure/material/material.module';
import {UserManagementModule} from './user-management/user-management.module';
import {EventsModule} from './events/events.module';
import { SolutionsModule } from './solutions/solutions.module';
import { ProductsModule } from './products/products.module';
import { ServicesModule } from './services/services.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    UserManagementModule,
    MaterialModule,
    EventsModule,
    SolutionsModule,
    ProductsModule,
    ServicesModule, 
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: LOCALE_ID, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
