import { Injectable } from '@angular/core';
import {CreateEventType, EventType, EventTypeCard, EventTypeWithActivity, UpdateEventType} from './model/events.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../env/constants';
import {Observable} from 'rxjs';
import {PageProperties} from '../shared/model/page-properties.model';
import {PagedResponse} from '../shared/model/paged-response.model';

@Injectable({
  providedIn: 'root'
})
export class EventTypeService {
  private readonly urlPrefix: string = "/api/events/types/";

  constructor (private httpClient: HttpClient) {

  }

  getEventTypes(search?: string, pageProperties?: PageProperties): Observable<PagedResponse<EventTypeCard>> {
    let params = new HttpParams();
    if(search) {
      params = params.set('search', search);
    }

    if(pageProperties) {
      params = params
        .set('page', pageProperties.page)
        .set('size', pageProperties.size);
    }

    return this.httpClient.get<PagedResponse<EventTypeCard>>(environment.apiHost + this.urlPrefix, { params: params });
  }

  getActiveEventTypes(): Observable<EventTypeCard[]> {
    return this.httpClient.get<EventTypeCard[]>(environment.apiHost + this.urlPrefix + "active");
  }

  get(id: number): Observable<EventTypeWithActivity> {
    return this.httpClient.get<EventTypeWithActivity>(environment.apiHost + this.urlPrefix + id);
}

  add(type: CreateEventType): Observable<EventType> {
    return this.httpClient.post<EventTypeWithActivity>(environment.apiHost + this.urlPrefix, type);
  }

  toggleActivate(id: number): Observable<EventType> {
    return this.httpClient.put<EventTypeWithActivity>(environment.apiHost + this.urlPrefix + id + 'activation', {});
  }

  update(type: UpdateEventType): Observable<EventType> {
    return this.httpClient.put<EventTypeWithActivity>(environment.apiHost + this.urlPrefix, type);
  }
}
