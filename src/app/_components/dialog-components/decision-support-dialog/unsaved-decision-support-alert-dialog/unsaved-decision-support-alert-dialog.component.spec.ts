import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsavedDecisionSupportAlertDialogComponent } from './unsaved-decision-support-alert-dialog.component';

describe('UnsavedDecisionSupportAlertDialogComponent', () => {
  let component: UnsavedDecisionSupportAlertDialogComponent;
  let fixture: ComponentFixture<UnsavedDecisionSupportAlertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnsavedDecisionSupportAlertDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnsavedDecisionSupportAlertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
