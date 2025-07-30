import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionCategoryManagementComponent } from './solution-category-management.component';

describe('SolutionCategoryManagementComponent', () => {
  let component: SolutionCategoryManagementComponent;
  let fixture: ComponentFixture<SolutionCategoryManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolutionCategoryManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolutionCategoryManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
