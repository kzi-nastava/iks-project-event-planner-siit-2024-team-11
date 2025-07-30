import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionCategoryInputDialogComponent } from './solution-category-input-dialog.component';

describe('SolutionCategoryInputDialogComponent', () => {
  let component: SolutionCategoryInputDialogComponent;
  let fixture: ComponentFixture<SolutionCategoryInputDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolutionCategoryInputDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolutionCategoryInputDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
