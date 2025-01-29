import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageProperties } from '../../../shared/model/page-properties.model';
import { Observable } from 'rxjs';
import { PagedResponse } from '../../../shared/model/paged-response.model';
import { environment } from '../../../../env/constants';
import { Notification } from '../../model/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly urlPrefix: string = "/api/notifications";

  constructor(private httpClient: HttpClient) {}

  getNotifications(userId?: number, pageProperties?: PageProperties): Observable<PagedResponse<Notification>> {
      let params = new HttpParams();
      if (userId) {
        params = params.set('userId', userId);
      }
  
      if(pageProperties) {
        params = params
          .set('page', pageProperties.page)
          .set('size', pageProperties.size);
      }
  
      return this.httpClient.get<PagedResponse<Notification>>(environment.apiHost + this.urlPrefix, { params: params });
    }
}
