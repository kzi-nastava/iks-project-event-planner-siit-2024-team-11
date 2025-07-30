import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface SuccessfulDialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-successful-dialog',
  templateUrl: './successful-dialog.component.html',
  styleUrl: './successful-dialog.component.css'
})
export class SuccessfulDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<SuccessfulDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SuccessfulDialogData
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
