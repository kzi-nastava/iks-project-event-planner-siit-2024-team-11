import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

interface DialogData {
  title: string;
  message: string;
}
@Component({
  selector: 'app-invalid-input-data-dialog',
  templateUrl: './invalid-input-data-dialog.component.html',
  styleUrl: './invalid-input-data-dialog.component.css'
})
export class InvalidInputDataDialogComponent {
  title: string;
  message: string;

  constructor(public dialogRef: MatDialogRef<InvalidInputDataDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.title = data.title;
    this.message = data.message;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
