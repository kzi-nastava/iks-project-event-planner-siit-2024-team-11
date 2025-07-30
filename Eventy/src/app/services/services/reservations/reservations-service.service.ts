import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../env/constants';
import { PagedResponse } from '../../../shared/model/paged-response.model';
import { CreateReservationComponent } from '../../create-reservation/create-reservation.component';
import { Reservation } from '../../model/reservations.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  private readonly urlPrefix: string = "/api/reservations";

  constructor(private httpClient: HttpClient) { }

  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.httpClient.post<Reservation>(environment.apiHost + this.urlPrefix, reservation);
  }
}
