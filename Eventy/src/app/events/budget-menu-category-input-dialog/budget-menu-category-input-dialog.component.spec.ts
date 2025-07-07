import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetMenuCategoryInputDialogComponent } from './budget-menu-category-input-dialog.component';

describe('BudgetMenuCategoryInputDialogComponent', () => {
  let component: BudgetMenuCategoryInputDialogComponent;
  let fixture: ComponentFixture<BudgetMenuCategoryInputDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BudgetMenuCategoryInputDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetMenuCategoryInputDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
