import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../env/constants';
import { CategoryWithId } from '../../model/category-with-id.model';
import { Category, Status } from '../../model/category.model';

@Injectable({
  providedIn: 'root'
})
export class SolutionCategoryService {
  private controllerURL: string = environment.apiHost + "/api/categories";
  categories: CategoryWithId[] = [
    { id: 1, name: 'Category 1', description: 'Description for category 1', status: Status.ACCEPTED },
    { id: 2, name: 'Category 2', description: 'Description for category 2', status: Status.ACCEPTED },
    { id: 3, name: 'Category 3', description: 'Description for category 3', status: Status.ACCEPTED },
    { id: 4, name: 'Category 4', description: 'Description for category 4', status: Status.ACCEPTED },
    { id: 5, name: 'Category 5', description: 'Description for category 5', status: Status.ACCEPTED },
    { id: 6, name: 'Category 6', description: 'Description for category 6', status: Status.ACCEPTED },
    { id: 7, name: 'Category 7', description: 'Description for category 7', status: Status.ACCEPTED },
    { id: 8, name: 'Category 8', description: 'Description for category 8', status: Status.ACCEPTED },
    { id: 9, name: 'Category 9', description: 'Description for category 9', status: Status.ACCEPTED },
    { id: 10, name: 'Category 10', description: 'Description for category 10', status: Status.ACCEPTED }
 ];

 requests: CategoryWithId[] = [
  { id: 1, name: 'Request 1', description: 'Description for category 1', status: Status.PENDING },
  { id: 2, name: 'Request 2', description: 'Description for category 2', status: Status.PENDING },
  { id: 3, name: 'Request 3', description: 'Description for category 3', status: Status.PENDING },
  { id: 4, name: 'Request 4', description: 'Description for category 4', status: Status.PENDING },
  { id: 5, name: 'Request 5', description: 'Description for category 5', status: Status.PENDING },
  { id: 6, name: 'Request 6', description: 'Description for category 6', status: Status.PENDING },
  { id: 7, name: 'Request 7', description: 'Description for category 7', status: Status.PENDING },
  { id: 8, name: 'Request 8', description: 'Description for category 8', status: Status.PENDING },
  { id: 9, name: 'Request 9', description: 'Description for category 9', status: Status.PENDING },
  { id: 10, name: 'Request 10', description: 'Description for category 10', status: Status.PENDING }
];

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<CategoryWithId[]> {
    //return this.httpClient.get<CategoryWithId[]>(this.controllerURL)
    return of(this.categories)
  }

  delete(categoryId: number): void {
    this.httpClient.delete(this.controllerURL + categoryId);
  }

  update(category: CategoryWithId): Observable<CategoryWithId> {
    return this.httpClient.put<CategoryWithId>(this.controllerURL + `/${category.id}`, category);
  }

  create(category: Category): Observable<CategoryWithId> {
    return this.httpClient.post<CategoryWithId>(this.controllerURL, category)
  }

  getAllRequests(): Observable<CategoryWithId[]> {
    // return this.httpClient.get<CategoryWithId[]>(this.controllerURL + "/requests")
    return of(this.requests);
  }
}