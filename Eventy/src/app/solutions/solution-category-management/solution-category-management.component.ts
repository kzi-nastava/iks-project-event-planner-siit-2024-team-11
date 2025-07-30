import { Component } from '@angular/core';

@Component({
  selector: 'app-solution-category-management',
  templateUrl: './solution-category-management.component.html',
  styleUrl: './solution-category-management.component.css'
})
export class SolutionCategoryManagementComponent {
  isRequestsSelected: boolean = true;
  currentTab: number = 1;

  switchTab(tab: number) : void { 
    if (this.currentTab === 1 && tab === 2) {
      this.currentTab = 2;
      this.isRequestsSelected = !this.isRequestsSelected;
    }

    if (this.currentTab === 2 && tab === 1) {
      this.currentTab = 1;
      this.isRequestsSelected = !this.isRequestsSelected;
    }
  }
}
