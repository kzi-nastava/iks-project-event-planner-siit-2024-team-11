import { Injectable } from '@angular/core';
import { EventCard } from '../../model/event-card.model';
import { Event, OrganizeEvent, UnreviewedEvent } from '../../model/events.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../env/constants';
import { PagedResponse } from '../../../shared/model/paged-response.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private readonly urlPrefix: string = "/api/events";

  constructor(private httpClient: HttpClient) {}

  getAllEvents(
    pageProperties?: { page?: number; pageSize?: number; sort?: string }, 
    filters?: { search?: string; eventTypes?: string[]; location?: string; maxParticipants?: number; startDate?: Date; endDate?: Date }
  ): Observable<PagedResponse<EventCard>> {

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
      if (filters.eventTypes && filters.eventTypes.length > 0) {
        params = params.set('eventTypes', filters.eventTypes.join(','));
      }
      if (filters.location) {
        params = params.set('location', filters.location);
      }
      if (filters.maxParticipants) {
        params = params.set('maxParticipants', filters.maxParticipants.toString());
      }
      if (filters.startDate) {
        params = params.set('startDate', filters.startDate.toISOString());
      }
      if (filters.endDate) {
        params = params.set('endDate', filters.endDate.toISOString());
      }
    }

    return this.httpClient.get<PagedResponse<EventCard>>(environment.apiHost + this.urlPrefix, {params: params});
  }

  getFeaturedEvents(): Observable<EventCard[]> {
    return this.httpClient.get<EventCard[]>(environment.apiHost + this.urlPrefix + "/featured");
  }

  organizeEvent(event: OrganizeEvent): Observable<Event> {
    return this.httpClient.post<Event>(environment.apiHost + this.urlPrefix, event);
  }

  getUnreviewedAcceptedEventsByUserId(userId: number): Observable<UnreviewedEvent[]> {
    return this.httpClient.get<UnreviewedEvent[]>(environment.apiHost + this.urlPrefix + "/unreviewed/" + userId);
  }
}
