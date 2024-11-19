import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidInputDataDialogComponent } from './invalid-input-data-dialog.component';

describe('InvalidInputDataDialogComponent', () => {
  let component: InvalidInputDataDialogComponent;
  let fixture: ComponentFixture<InvalidInputDataDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvalidInputDataDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvalidInputDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
