import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetMenuCategoryItemComponent } from './budget-menu-category-item.component';

describe('BudgetMenuCategoryItemComponent', () => {
  let component: BudgetMenuCategoryItemComponent;
  let fixture: ComponentFixture<BudgetMenuCategoryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BudgetMenuCategoryItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetMenuCategoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
