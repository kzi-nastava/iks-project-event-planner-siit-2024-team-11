import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeProfileComponent } from './upgrade-profile.component';

describe('UpgradeProfileComponent', () => {
  let component: UpgradeProfileComponent;
  let fixture: ComponentFixture<UpgradeProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpgradeProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpgradeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
