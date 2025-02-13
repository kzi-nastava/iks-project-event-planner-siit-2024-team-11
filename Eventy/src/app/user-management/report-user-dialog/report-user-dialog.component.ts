import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';
import { ReportService } from '../service/report.service';
import { CreateReport } from '../model/reports.model';
import { SuccessfulDialogComponent } from '../../shared/successful-dialog/successful-dialog.component';

export interface ReportDialogData {
  title: string;
  message: string;
  createReport: CreateReport;
}

@Component({
  selector: 'app-report-user-dialog',
  templateUrl: './report-user-dialog.component.html',
  styleUrl: './report-user-dialog.component.css'
})
export class ReportUserDialogComponent {
  reportForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ReportUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReportDialogData,
    private dialog: MatDialog,
    private reportService: ReportService,
  ) {
    this.reportForm = new FormGroup({
      message: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.reportForm.patchValue({
      message: "",
    });
  }

  confirmReport() {
    if (this.reportForm.invalid) {
      this.reportForm.updateValueAndValidity();
      this.reportForm.markAllAsTouched();

    } else {
      let message = this.reportForm.controls['message'].value;
      this.data.createReport.reason = message;

      this.reportService.createReport(this.data.createReport).subscribe({
        next: () => {
          this.dialogRef.close();
          this.dialog.open(SuccessfulDialogComponent, {
            data : {
              title: "Report Successful!",
              message: "Report created successfully!"
            }
          });
        },
        error: () => {
          this.dialog.open(ErrorDialogComponent, {
            data : {
              title: "Error!",
              message: "Error while creating a report!"
            }
          });
        }
      });
    }
  }

  resetValue(targetField: string): void {
    if(this.reportForm.controls.hasOwnProperty(targetField)) {
      let fieldsWithoutErrors: string[] = [];

      for(let field in this.reportForm.controls) {
        if(field !== targetField && !this.reportForm.controls[field].touched) {
          fieldsWithoutErrors.push(field);
        }
      }

      this.reportForm.controls[targetField].setValue('');

      for(let field of fieldsWithoutErrors) {
        this.reportForm.controls[field].setErrors(null);
      }
    }
  }
}
