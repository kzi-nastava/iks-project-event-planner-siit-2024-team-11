import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateReport } from '../model/reports.model';
import { Observable } from 'rxjs';
import { environment } from '../../../env/constants';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private readonly urlPrefix: string = "/api/reports";

  constructor(private httpClient: HttpClient) {}

  createReport(review: CreateReport): Observable<CreateReport> {
    return this.httpClient.post<CreateReport>(environment.apiHost + this.urlPrefix, review);
  }

  /*
  isSolutionReviewedByUser(userId: number, solutionId: number): Observable<Boolean> {
    return this.httpClient.get<Boolean>(environment.apiHost + this.urlPrefix + "/user/" + userId + "/solution/" + solutionId);
  }

  getAllPendingReviews(pageProperties?: PageProperties): Observable<PagedResponse<Review>> {
    let params = new HttpParams();

    if(pageProperties) {
      params = params
        .set('page', pageProperties.page)
        .set('size', pageProperties.size);
    }

    return this.httpClient.get<PagedResponse<Review>>(environment.apiHost + this.urlPrefix + "/pending", { params: params });
  }

  acceptReview(reviewId: number): Observable<Review> {
    return this.httpClient.put<Review>(environment.apiHost + this.urlPrefix + "/" + reviewId + "/accept", {});
  }

  declineReview(reviewId: number): Observable<Review> {
    return this.httpClient.put<Review>(environment.apiHost + this.urlPrefix + "/" + reviewId + "/decline", {});
  }*/
}
