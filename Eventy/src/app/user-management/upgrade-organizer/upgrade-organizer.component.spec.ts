import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeOrganizerComponent } from './upgrade-organizer.component';

describe('UpgradeOrganizerComponent', () => {
  let component: UpgradeOrganizerComponent;
  let fixture: ComponentFixture<UpgradeOrganizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpgradeOrganizerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpgradeOrganizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
