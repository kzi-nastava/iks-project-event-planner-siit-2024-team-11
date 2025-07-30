import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface YesNoFancierDialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-yes-no-fancier-dialog',
  templateUrl: './yes-no-fancier-dialog.component.html',
  styleUrl: './yes-no-fancier-dialog.component.css'
})
export class YesNoFancierDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<YesNoFancierDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: YesNoFancierDialogData
  ) {}

  confirm() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
