import { Component, Inject, Input } from '@angular/core';
import { SolutionCard } from '../../solutions/model/solution-card.model';
import { SolutionsService } from '../../solutions/services/solutions/solutions-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PagedResponse } from '../../shared/model/paged-response.model';
import { Router } from '@angular/router';
import { ProductService } from '../../products/product.service';
import { SolutionDTO } from '../../solutions/model/solutions.model';

export interface BudgetMenuSolutionSelectionDialogData {
  categoryName: string,
  eventId: number;
}

@Component({
  selector: 'app-budget-menu-solution-selection-dialog',
  templateUrl: './budget-menu-solution-selection-dialog.component.html',
  styleUrl: './budget-menu-solution-selection-dialog.component.css'
})
export class BudgetMenuSolutionSelectionDialogComponent {
  stage: number = 1;
  availableSolutions: SolutionCard[] = [];
  solutionType: string = '';
  selectedSolution: SolutionCard = null;

  constructor(private dialogRef: MatDialogRef<BudgetMenuSolutionSelectionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: BudgetMenuSolutionSelectionDialogData,
              private solutionsService: SolutionsService, private router: Router, private productService: ProductService) {}

  fetchData() {
    console.log("commence")
    this.solutionsService.getAllSolutions(null, {type: this.solutionType, categories: [this.data.categoryName]}).subscribe({
      next: (response: PagedResponse<SolutionCard>) => {
        this.availableSolutions = response.content;
        console.log(response)
      }
    })
  }

  loadProducts(): void {
    this.solutionType = 'Product';
    this.stage = 2;
    this.fetchData();
  }

  loadServices(): void {
    this.solutionType = 'Service';
    this.stage = 2;
    this.fetchData();
  }

  handleSolutionSelected(solution: SolutionCard): void {
    this.selectedSolution = solution;
    if (this.selectedSolution.type === "SERVICE") {
      this.dialogRef.close([false, null])
      this.router.navigate(['/create-reservation'], { state: { selectedService: this.selectedSolution } });
    } else {
      this.stage = 3;
    }
  }

  purchaseProduct(): void {
    this.productService.purchase(this.selectedSolution.solutionId, this.data.eventId).subscribe({
      next: (value: SolutionDTO) => {
        this.dialogRef.close([true, value]);
      }
    })
  }

  returnToSolutionList(): void {
    this.stage = 2;
  }
}
