import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateReport, Report } from '../model/reports.model';
import { Observable } from 'rxjs';
import { environment } from '../../../env/constants';
import { PageProperties } from '../../shared/model/page-properties.model';
import { PagedResponse } from '../../shared/model/paged-response.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private readonly urlPrefix: string = "/api/reports";

  constructor(private httpClient: HttpClient) {}

  createReport(report: CreateReport): Observable<CreateReport> {
    return this.httpClient.post<CreateReport>(environment.apiHost + this.urlPrefix, report);
  }

  getAllPendingReports(pageProperties?: PageProperties): Observable<PagedResponse<Report>> {
    let params = new HttpParams();

    if(pageProperties) {
      params = params
        .set('page', pageProperties.page)
        .set('size', pageProperties.size);
    }

    return this.httpClient.get<PagedResponse<Report>>(environment.apiHost + this.urlPrefix + "/pending", { params: params });
  }

  acceptReport(reportId: number): Observable<Report> {
    return this.httpClient.put<Report>(environment.apiHost + this.urlPrefix + "/" + reportId + "/accept", {});
  }

  declineReport(reportId: number): Observable<Report> {
    return this.httpClient.put<Report>(environment.apiHost + this.urlPrefix + "/" + reportId + "/decline", {});
  }
}
