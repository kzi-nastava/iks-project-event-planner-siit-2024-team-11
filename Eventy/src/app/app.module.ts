import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LayoutModule } from './layout/layout.module';
import { MaterialModule } from './infrastructure/material/material.module';
import { UserManagementModule } from './user-management/user-management.module';
import { EventsModule } from './events/events.module';
import { SolutionsModule } from './solutions/solutions.module';
import { ProductsModule } from './products/products.module';
import { ServicesModule } from './services/services.module';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { Interceptor } from './infrastructure/auth/interceptor';
import { InteractionsModule } from './interactions/interactions.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ChatModule } from './chat/chat.module';


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
    InteractionsModule,
    ReviewsModule,
    InteractionsModule,
    ChatModule
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: LOCALE_ID, useValue: 'en-GB' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
    provideHttpClient(withFetch(), withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
