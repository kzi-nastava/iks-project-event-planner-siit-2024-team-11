import { Injectable } from '@angular/core';
import {CalendarOccupancy, UpdateUser, User} from './model/users.model';
import {EventCard} from '../events/model/event-card.model';
import {SolutionCard} from '../solutions/model/solution-card.model';
import {environment} from '../../env/constants';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {formatDate} from '@angular/common';
import {PageProperties} from '../shared/model/page-properties.model';
import {PagedResponse} from '../shared/model/paged-response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly userProfileUrlPrefix: string = "/api/users";
  private readonly eventsUrlPrefix: string = "/api/events";
  private readonly solutionsUrlPrefix: string = "/api/solutions";

  constructor(private httpClient: HttpClient) {
  }

  get(id: number): Observable<User> {
    return this.httpClient.get<User>(environment.apiHost + this.userProfileUrlPrefix + "/" + id);
  }

  edit(updateUser: UpdateUser): Observable<User> {
    return this.httpClient.put<User>(environment.apiHost + this.userProfileUrlPrefix, updateUser);
  }

  deactivate(id: number): any {
    return this.httpClient.delete(environment.apiHost + this.userProfileUrlPrefix + "/" + id);
  }

  getMyCalendar(id: number, startDate: Date, endDate: Date): Observable<CalendarOccupancy[]> {
    let params = new HttpParams();

    if(startDate && endDate) {
      const formattedStartDate = formatDate(startDate, 'yyyy-MM-dd', 'en-US');
      const formattedEndDate = formatDate(endDate, 'yyyy-MM-dd', 'en-US');

      params = params
        .set('startDate', formattedStartDate)
        .set('endDate', formattedEndDate);
    }

    return this.httpClient.get<CalendarOccupancy[]>(environment.apiHost + this.userProfileUrlPrefix + "/" + id + "/calendar", { params: params });
  }

  getMyFavoriteEvents(userId: number, search?: string, pageProperties?: PageProperties): Observable<PagedResponse<EventCard>> {
    let params = new HttpParams();

    if(search) {
      params = params.set('search', search);
    }

    if(pageProperties) {
      params = params
        .set('page', pageProperties.page)
        .set('size', pageProperties.size);
    }

    return this.httpClient.get<PagedResponse<EventCard>>(environment.apiHost + this.eventsUrlPrefix + "/favorite/" + userId, { params: params });
  }

  getMyFavoriteSolutions(userId: number, search?: string, pageProperties?: PageProperties): Observable<PagedResponse<SolutionCard>> {
    let params = new HttpParams();

    if(search) {
      params = params.set('search', search);
    }

    if(pageProperties) {
      params = params
        .set('page', pageProperties.page)
        .set('size', pageProperties.size);
    }

    return this.httpClient.get<PagedResponse<SolutionCard>>(environment.apiHost + this.solutionsUrlPrefix + "/favorite/" + userId, { params: params });
  }

  getMyEvents(userId: number, search?: string, pageProperties?: PageProperties): Observable<PagedResponse<EventCard>> {
    let params = new HttpParams();

    if(search) {
      params = params.set('search', search);
    }

    if(pageProperties) {
      params = params
        .set('page', pageProperties.page)
        .set('size', pageProperties.size);
    }

    return this.httpClient.get<PagedResponse<EventCard>>(environment.apiHost + this.eventsUrlPrefix + "/organized/" + userId, { params: params });
  }

  getMySolutions(userId: number, search?: string, pageProperties?: PageProperties): Observable<PagedResponse<SolutionCard>> {
    let params = new HttpParams();

    if(search) {
      params = params.set('search', search);
    }

    if(pageProperties) {
      params = params
        .set('page', pageProperties.page)
        .set('size', pageProperties.size);
    }

    return this.httpClient.get<PagedResponse<SolutionCard>>(environment.apiHost + this.solutionsUrlPrefix + "/catalog/" + userId, { params: params });
  }

  getUserNotificationsInfo(userId: number): Observable<Boolean> {
    return this.httpClient.get<Boolean>(environment.apiHost + this.userProfileUrlPrefix + "/" + userId + "/notifications-info");
  }
}
