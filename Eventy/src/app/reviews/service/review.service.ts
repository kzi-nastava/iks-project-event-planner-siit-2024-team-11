import { HttpClient, HttpParams, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateReview, Review } from '../model/review.model';
import { Observable } from 'rxjs';
import { environment } from '../../../env/constants';
import { PageProperties } from '../../shared/model/page-properties.model';
import { PagedResponse } from '../../shared/model/paged-response.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private readonly urlPrefix: string = "/api/reviews";

  constructor(private httpClient: HttpClient) {}

  createReview(review: CreateReview): Observable<CreateReview> {
    return this.httpClient.post<CreateReview>(environment.apiHost + this.urlPrefix, review);
  }

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
  }

  getAllForSolution(solutionId: number): Observable<Review[]> {
    return this.httpClient.get<Review[]>(environment.apiHost + this.urlPrefix + "/solution/" + solutionId);
  }
}
