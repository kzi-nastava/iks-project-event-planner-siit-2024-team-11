import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class CustomMatPaginatorIntlService extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Items';
}
