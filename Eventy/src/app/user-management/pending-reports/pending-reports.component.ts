import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PagedResponse } from '../../shared/model/paged-response.model';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';
import { ReportService } from '../service/report.service';
import { Report } from '../model/reports.model';
import { ReportDetailsDialogComponent } from '../report-details-dialog/report-details-dialog.component';

@Component({
  selector: 'app-pending-reports',
  templateUrl: './pending-reports.component.html',
  styleUrl: './pending-reports.component.css'
})
export class PendingReportsComponent {
  paginatedPendingReports: Report[] = [];
  pageEvent: PageEvent;
  pageSize: number = 5;
  currentPage: number = 0;
  totalCount: number = 100;

  constructor(private reportService: ReportService,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.updatePaginatedReports();
  }

  public onPageChange(event?: PageEvent){
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedReports();
  }

  private updatePaginatedReports(): void {
    this.reportService.getAllPendingReports(
      { page: this.currentPage, size: this.pageSize },
    ).subscribe({
      next: (response: PagedResponse<Report>) => {
        this.paginatedPendingReports = response.content;
        this.totalCount = response.totalElements;
      },
      error: (err) => {
        console.error('Failed to fetch events:', err);
      },
    });
  }

  public openReportDetails(report: Report) {
    this.dialog.open(ReportDetailsDialogComponent, {
      width: '320px',
      backdropClass: 'blurred_backdrop_dialog',
      data: {
        report: report
      },
    });
  }

  public acceptReport(report: Report) {
    this.reportService.acceptReport(report.id).subscribe({
      next: () => {
        this.updatePaginatedReports();
      },
      error: () => {
        this.dialog.open(ErrorDialogComponent, {
          width: '400px',
          backdropClass: 'blurred_backdrop_dialog',
          data: {
            title: 'Error',
            message: 'An unexpected error occured while accepting the review.',
          },
        });
      },
    });
  }

  public declineReport(report: Report) {
    this.reportService.declineReport(report.id).subscribe({
      next: () => {
        this.updatePaginatedReports();
      },
      error: () => {
        this.dialog.open(ErrorDialogComponent, {
          width: '400px',
          backdropClass: 'blurred_backdrop_dialog',
          data: {
            title: 'Error',
            message: 'An unexpected error occured while declining the review.',
          },
        });
      },
    });
  }
}

