import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetMenuCategoryComponent } from './budget-menu-category.component';

describe('BudgetMenuCategoryComponent', () => {
  let component: BudgetMenuCategoryComponent;
  let fixture: ComponentFixture<BudgetMenuCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BudgetMenuCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetMenuCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
