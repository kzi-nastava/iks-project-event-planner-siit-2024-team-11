import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateReview } from '../model/review.model';
import { Observable } from 'rxjs';
import { environment } from '../../../env/constants';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private readonly urlPrefix: string = "/api/reviews";

  constructor(private httpClient: HttpClient) {}

  createReview(review: CreateReview): Observable<CreateReview> {
    return this.httpClient.post<CreateReview>(environment.apiHost + this.urlPrefix, review);
  }
}
