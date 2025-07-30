import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetMenuComponent } from './budget-menu.component';

describe('BudgetMenuComponent', () => {
  let component: BudgetMenuComponent;
  let fixture: ComponentFixture<BudgetMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BudgetMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
