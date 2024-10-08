import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-save-decision-support-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './save-decision-support-dialog.component.html',
  styleUrl: './save-decision-support-dialog.component.scss'
})
export class SaveDecisionSupportDialogComponent {

  constructor(public dialogRef: MatDialogRef<SaveDecisionSupportDialogComponent>) { }

  /** Close the dialog when the user clicks close */
  close(): void {
    this.dialogRef.close(null);
  }

  /** Send the confirmation if the user clicks save */
  ok(): void {
    this.dialogRef.close(true);
  }
}