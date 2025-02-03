import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../env/constants';
import { CategoryWithId } from '../../model/category-with-id.model';
import { Category } from '../../model/category.model';
import { PagedResponse } from '../../../shared/model/paged-response.model';
import { PageProperties } from '../../../shared/model/page-properties.model';

@Injectable({
  providedIn: 'root'
})
export class SolutionCategoryService {
  private controllerURL: string = environment.apiHost + "/api/categories";

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<CategoryWithId[]> {
    return this.httpClient.get<CategoryWithId[]>(this.controllerURL)
  }

  getAllPaginated(pageProperties: PageProperties): Observable<PagedResponse<CategoryWithId>> {
    let params: HttpParams = new HttpParams();
    params = params
        .set('page', pageProperties.page)
        .set('size', pageProperties.size);
    return this.httpClient.get<PagedResponse<CategoryWithId>>(this.controllerURL + "/paged", {params: params})
  }

  delete(categoryId: number): void {
    this.httpClient.delete(this.controllerURL + categoryId);
  }

  update(category: CategoryWithId): Observable<CategoryWithId> {
    return this.httpClient.put<CategoryWithId>(this.controllerURL, category);
  }

  acceptRequest(requestId: number): Observable<CategoryWithId> {
    return this.httpClient.put<CategoryWithId>(this.controllerURL + "/requests/accept/" + requestId, {});
  }

  changeRequest(newCategory: CategoryWithId): Observable<CategoryWithId> {
    return this.httpClient.put<CategoryWithId>(this.controllerURL + "/requests/change", newCategory);
  }

  replaceRequest(replacedCategoryId: number, newlyUsedCategoryId: number): Observable<CategoryWithId> {
    let params: HttpParams = new HttpParams();
    params = params.set("replacedCategoryId", replacedCategoryId)
                  .set("newlyUsedCategoryId", newlyUsedCategoryId);
    
    return this.httpClient.put<CategoryWithId>(this.controllerURL + "/requests/replace", {}, {params: params})
  }

  create(category: Category): Observable<CategoryWithId> {
    return this.httpClient.post<CategoryWithId>(this.controllerURL, category)
  }

  getAllRequests(): Observable<PagedResponse<CategoryWithId>> {
    return this.httpClient.get<PagedResponse<CategoryWithId>>(this.controllerURL + "/requests")
  }
}