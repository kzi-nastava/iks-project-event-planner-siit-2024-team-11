import { Injectable } from '@angular/core';
import { SolutionCard } from '../../model/solution-card.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../env/constants';
import { PagedResponse } from '../../../shared/model/paged-response.model';
import { SolutionDTO } from '../../model/solutions.model';
import { PricelistItem } from '../../model/pricelist-item.model';
import { PageProperties } from '../../../shared/model/page-properties.model';

@Injectable({
  providedIn: 'root'
})
export class SolutionsService {
  private readonly urlPrefix: string = "/api/solutions";

  constructor(private httpClient: HttpClient) {}

  getAllSolutions(
    pageProperties?: { page?: number; pageSize?: number; sort?: string },
    filters?: { search?: string; type?: string, categories?: string[]; eventTypes?: string[]; company?: string; minPrice?: number; maxPrice?: number; startDate?: Date; endDate?: Date; isAvailable?: boolean;
    }
  ): Observable<PagedResponse<SolutionCard>> {

    // pageable
    let params = new HttpParams();
    if (pageProperties) {
      if (pageProperties.page !== undefined) {
        params = params.set('page', pageProperties.page.toString());
      }
      if (pageProperties.pageSize !== undefined) {
        params = params.set('size', pageProperties.pageSize.toString());
      }
      if (pageProperties.sort) {
        params = params.set('sort', pageProperties.sort);
      }
    }

    // my custom filters
    if (filters) {
      if (filters.search) {
        params = params.set('search', filters.search);
      }
      if (filters.type) {
        params = params.set('type', filters.type);
      }
      if (filters.categories && filters.categories.length > 0) {
        params = params.set('categories', filters.categories.join(','));
      }
      if (filters.eventTypes && filters.eventTypes.length > 0) {
        params = params.set('eventTypes', filters.eventTypes.join(','));
        params = params.set('eventTypesSize', filters.eventTypes.length.toString());
      }
      if (filters.company) {
        params = params.set('company', filters.company);
      }
      if (filters.minPrice) {
        params = params.set('minPrice', filters.minPrice.toString());
      }
      if (filters.maxPrice) {
        params = params.set('maxPrice', filters.maxPrice.toString());
      }
      if (filters.startDate) {
        params = params.set('startDate', filters.startDate.toISOString());
      }
      if (filters.endDate) {
        params = params.set('endDate', filters.endDate.toISOString());
      }
      if (filters.isAvailable !== undefined) {
        params = params.set('isAvailable', filters.isAvailable);
      }
    }
    return this.httpClient.get<PagedResponse<SolutionCard>>(environment.apiHost + this.urlPrefix, {params: params});
  }

  getFeaturedSolutions(): Observable<SolutionCard[]> {
    return this.httpClient.get<SolutionCard[]>(environment.apiHost + this.urlPrefix + "/featured");
  }

  getSolution(id: number): Observable<SolutionCard> {
    return this.httpClient.get<SolutionCard>(environment.apiHost + this.urlPrefix + "/cards/" + id);
  }

  toggleFavorite(id: number): Observable<Boolean> {
    return this.httpClient.put<Boolean>(environment.apiHost + this.urlPrefix + "/favorite/" + id, {})
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(environment.apiHost + this.urlPrefix + "/" + id)
  }

  toggleAvailablity(id: number): Observable<any> {
    return this.httpClient.put<any>(environment.apiHost + this.urlPrefix + "/" + id + "/availability", {});
  }

  toggleVisibility(id: number): Observable<any> {
    return this.httpClient.put<any>(environment.apiHost + this.urlPrefix + "/" + id + "/visibility", {});
  }

  get(id: number): Observable<SolutionDTO> {
    return this.httpClient.get<SolutionDTO>(environment.apiHost + this.urlPrefix + "/" + id)
  }

  getPricelist(pageProperties: PageProperties): Observable<PagedResponse<PricelistItem>> {
    let params: HttpParams = new HttpParams();
    params = params
        .set('page', pageProperties.page)
        .set('size', pageProperties.size);
    return this.httpClient.get<PagedResponse<PricelistItem>>(environment.apiHost + this.urlPrefix + "/pricelist")
  }

  updatePrice(newData: PricelistItem): Observable<PricelistItem> {
    return this.httpClient.put<PricelistItem>(environment.apiHost + this.urlPrefix + "/pricelist", newData);
  }

  downloadPricelistPdf(): Observable<Blob> {
    return this.httpClient.get(environment.apiHost + this.urlPrefix + "/pricelist/pdf", {
      responseType: 'blob'
    });
  }
}
