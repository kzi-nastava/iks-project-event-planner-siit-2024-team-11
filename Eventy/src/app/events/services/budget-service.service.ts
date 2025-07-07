import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Budget, BudgetItem } from '../model/budget.model';
import { environment } from '../../../env/constants';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private readonly urlPrefix: string = "/api/budget";

  constructor(private httpClient: HttpClient) { }

  get(eventId: number): Observable<Budget> {
    return this.httpClient.get<Budget>(environment.apiHost + this.urlPrefix + "/" + eventId);
  }

  createBudgetItem(eventId: number, categoryId: number, allocatedFunds: number): Observable<BudgetItem> {
    return this.httpClient.post<BudgetItem>(environment.apiHost + this.urlPrefix + "/" + eventId + "/item/" + categoryId, allocatedFunds);
  }

  removeBudgetItem(budgetItemId: number): Observable<any> {
    return this.httpClient.delete<any>(environment.apiHost + this.urlPrefix + "/item/" + budgetItemId)
  }

  updateBudgetItemFunds(budgetItemId: number, newAllocatedFunds: number): Observable<BudgetItem> {
    return this.httpClient.put<BudgetItem>(environment.apiHost + this.urlPrefix + "/item/" + budgetItemId, newAllocatedFunds);
  }

  removeBudgetItemSolution(budgetItemId: number, solutionId: number): Observable<any> {
    return this.httpClient.delete<any>(environment.apiHost + this.urlPrefix + "/item/" + budgetItemId + "/" + solutionId)
  }
}
