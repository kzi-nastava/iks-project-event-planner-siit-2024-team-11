import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface YesNoInputDialogData {
  message: string
}

@Component({
  selector: 'app-yes-no-input-dialog',
  templateUrl: './yes-no-input-dialog.component.html',
  styleUrl: './yes-no-input-dialog.component.css'
})
export class YesNoInputDialogComponent {

  message: string

  constructor(private dialogRef: MatDialogRef<YesNoInputDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: YesNoInputDialogData) {
    this.message = data.message;
  }

  onYes() {
    this.dialogRef.close(true);
  }

  onNo() {
    this.dialogRef.close(false);
  }
}
