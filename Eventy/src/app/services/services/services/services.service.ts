import { Injectable } from '@angular/core';
import { PagedResponse } from '../../../shared/model/paged-response.model';
import { SolutionCard } from '../../../solutions/model/solution-card.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../env/constants';
import { AuthService } from '../../../infrastructure/auth/auth.service';
import { CreateService, Service, UpdateService } from '../../model/services.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private readonly prefix: string = "/api/services";
  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  getAllOwnServices(): Observable<PagedResponse<SolutionCard>> {
    let params: HttpParams = new HttpParams();
    params.set('organizerId', this.authService.getId());

    return this.httpClient.get<PagedResponse<SolutionCard>>(environment.apiHost + this.prefix + "/cards", {params: params});
  }

  add(newService: CreateService): Observable<Service> {
    return this.httpClient.post<Service>(environment.apiHost + this.prefix, newService);
  }

  update(updateService: UpdateService): Observable<Service> {
    return this.httpClient.put<Service>(environment.apiHost + this.prefix, updateService);
  }

  get(id: number): Observable<Service> {
    return this.httpClient.get<Service>(environment.apiHost + this.prefix + "/" + id)
  }
}
