import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionFiltersComponent } from './solution-filters.component';

describe('SolutionFiltersComponent', () => {
  let component: SolutionFiltersComponent;
  let fixture: ComponentFixture<SolutionFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolutionFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolutionFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
