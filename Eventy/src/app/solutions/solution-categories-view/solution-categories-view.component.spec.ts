import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionCategoriesViewComponent } from './solution-categories-view.component';

describe('SolutionCategoriesViewComponent', () => {
  let component: SolutionCategoriesViewComponent;
  let fixture: ComponentFixture<SolutionCategoriesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolutionCategoriesViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolutionCategoriesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
