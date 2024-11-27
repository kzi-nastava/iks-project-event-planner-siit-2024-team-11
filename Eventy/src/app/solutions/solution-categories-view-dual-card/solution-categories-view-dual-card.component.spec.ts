import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionCategoriesViewDualCardComponent } from './solution-categories-view-dual-card.component';

describe('SolutionCategoriesViewDualCardComponent', () => {
  let component: SolutionCategoriesViewDualCardComponent;
  let fixture: ComponentFixture<SolutionCategoriesViewDualCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolutionCategoriesViewDualCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolutionCategoriesViewDualCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
