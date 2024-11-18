import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedSolutionsComponent } from './featured-solutions.component';

describe('FeaturedSolutionsComponent', () => {
  let component: FeaturedSolutionsComponent;
  let fixture: ComponentFixture<FeaturedSolutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeaturedSolutionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedSolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
