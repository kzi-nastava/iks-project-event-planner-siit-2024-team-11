import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionCategoryRequestsViewComponent } from './solution-category-requests-view.component';

describe('SolutionCategoryRequestsViewComponent', () => {
  let component: SolutionCategoryRequestsViewComponent;
  let fixture: ComponentFixture<SolutionCategoryRequestsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolutionCategoryRequestsViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolutionCategoryRequestsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
