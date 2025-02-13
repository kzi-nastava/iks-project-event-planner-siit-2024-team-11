import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Report } from '../model/reports.model';


export interface ReportDetailsData {
  report: Report;
}

@Component({
  selector: 'app-report-details-dialog',
  templateUrl: './report-details-dialog.component.html',
  styleUrl: './report-details-dialog.component.css'
})
export class ReportDetailsDialogComponent {
constructor(
    private dialogRef: MatDialogRef<ReportDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReportDetailsData
  ) {}

  cancel() {
    this.dialogRef.close(false);
  }
}
