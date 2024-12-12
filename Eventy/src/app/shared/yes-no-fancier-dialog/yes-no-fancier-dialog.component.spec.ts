import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YesNoFancierDialogComponent } from './yes-no-fancier-dialog.component';

describe('YesNoFancierDialogComponent', () => {
  let component: YesNoFancierDialogComponent;
  let fixture: ComponentFixture<YesNoFancierDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YesNoFancierDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YesNoFancierDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
