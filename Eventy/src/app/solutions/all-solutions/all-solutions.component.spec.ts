import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSolutionsComponent } from './all-solutions.component';

describe('AllSolutionsComponent', () => {
  let component: AllSolutionsComponent;
  let fixture: ComponentFixture<AllSolutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllSolutionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
