import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YesNoInputDialogComponent } from './yes-no-input-dialog.component';

describe('YesNoInputDialogComponent', () => {
  let component: YesNoInputDialogComponent;
  let fixture: ComponentFixture<YesNoInputDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YesNoInputDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YesNoInputDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
