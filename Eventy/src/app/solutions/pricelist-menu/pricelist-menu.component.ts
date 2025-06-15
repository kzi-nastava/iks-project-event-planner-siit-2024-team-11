import { Component } from '@angular/core';
import { PricelistItem } from '../model/pricelist-item.model';
import { PageEvent } from '@angular/material/paginator';
import { SolutionsService } from '../services/solutions/solutions-service.service';
import { PagedResponse } from '../../shared/model/paged-response.model';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/error-dialog/error-dialog.component';

@Component({
  selector: 'app-pricelist-menu',
  templateUrl: './pricelist-menu.component.html',
  styleUrl: './pricelist-menu.component.css',
})
export class PricelistMenuComponent {

  items: PricelistItem[] = [];
  totalElements: number = 0;
  pageSize: number = 10;
  currentPage: number = 0;

  constructor(private solutionsService: SolutionsService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems(): void {
    this.solutionsService.getPricelist({page: this.currentPage, size: this.pageSize}).subscribe({
      next: (response: PagedResponse<PricelistItem>) => {
        console.log(response.content)
        this.items = response.content;
        this.totalElements = response.totalElements;
      }
    })
  }

  onPageChange(event: PageEvent): void {
      this.pageSize = event.pageSize;
      this.currentPage = event.pageIndex;
      this.fetchItems()
  }

  downloadPdf() {
    this.solutionsService.downloadPricelistPdf().subscribe({
      next: (response: Blob) => {
        const blob: Blob = new Blob([response], { type: 'application/pdf' });
        const url: string = window.URL.createObjectURL(blob);
        const anchor: HTMLAnchorElement = document.createElement('a');
        anchor.href = url;
        anchor.download = 'pricelist.pdf';
        anchor.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.log(error);
        this.dialog.open(ErrorDialogComponent, {
          width: '400px',
          disableClose: true,
          backdropClass: 'blurred_backdrop_dialog',
          data: {
            title: "Error while downloading",
            message: 'Error while downloading pricelist. Please try again later.',
          },
        });
      }
    })
  }
}
