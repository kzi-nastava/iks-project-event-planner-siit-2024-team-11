import { Component } from '@angular/core';
import { FeaturedSolutionsComponent } from '../../solutions/featured-solutions/featured-solutions.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isEventsSelected : boolean = true;

  switchTab() : void {
    this.isEventsSelected = !this.isEventsSelected;
  }
}
