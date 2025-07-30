import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetMenuCategoryEditDialogComponent } from './budget-menu-category-edit-dialog.component';

describe('BudgetMenuCategoryEditDialogComponent', () => {
  let component: BudgetMenuCategoryEditDialogComponent;
  let fixture: ComponentFixture<BudgetMenuCategoryEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BudgetMenuCategoryEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetMenuCategoryEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
