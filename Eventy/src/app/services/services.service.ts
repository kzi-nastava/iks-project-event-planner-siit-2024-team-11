import { Injectable } from '@angular/core';
import { Service } from '../solutions/model/services.model';
import { SolutionsServiceService } from '../solutions/services/solutions/solutions-service.service';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  serviceList: Service[] = [];

  constructor(private solutionsService: SolutionsServiceService) {
      solutionsService.getAllSolutions().forEach(solution => solution.service !== undefined ? this.serviceList.push(solution.service) : console.log)
  }

  getAll(): Service[] {
    return this.serviceList;
  }

  add(service: Service) {
    this.serviceList.push(service)
  }
}
