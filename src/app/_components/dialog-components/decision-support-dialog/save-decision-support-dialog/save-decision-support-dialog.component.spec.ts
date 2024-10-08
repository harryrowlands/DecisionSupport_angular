import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveDecisionSupportDialogComponent } from './save-decision-support-dialog.component';

describe('SaveDecisionSupportDialogComponent', () => {
  let component: SaveDecisionSupportDialogComponent;
  let fixture: ComponentFixture<SaveDecisionSupportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveDecisionSupportDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveDecisionSupportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
