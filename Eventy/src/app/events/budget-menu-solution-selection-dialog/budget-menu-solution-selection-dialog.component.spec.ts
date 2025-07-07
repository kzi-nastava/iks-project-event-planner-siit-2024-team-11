import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetMenuSolutionSelectionDialogComponent } from './budget-menu-solution-selection-dialog.component';

describe('BudgetMenuSolutionSelectionDialogComponent', () => {
  let component: BudgetMenuSolutionSelectionDialogComponent;
  let fixture: ComponentFixture<BudgetMenuSolutionSelectionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BudgetMenuSolutionSelectionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetMenuSolutionSelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
