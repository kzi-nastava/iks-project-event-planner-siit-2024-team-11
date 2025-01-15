import { Injectable } from '@angular/core';
import { Service } from '../../../solutions/model/services.model';
import { SolutionsService } from '../../../solutions/services/solutions/solutions-service.service';
import { Solution } from '../../../solutions/model/solutions.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  serviceList: Solution[] = [];

  constructor(private solutionsService: SolutionsService) {
    //solutionsService.getAllSolutions().forEach(solution => solution.service !== undefined ? this.serviceList.push(solution.service) : console.log)
  }

  getAllServices(): Solution[] {
    return this.serviceList;
  }

  add(service: Service) {
    this.serviceList.push(service)
  }
}
