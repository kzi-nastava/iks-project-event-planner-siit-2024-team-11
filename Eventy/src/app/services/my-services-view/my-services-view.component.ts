import { Component } from '@angular/core';
import { ServicesService } from '../services.service';
import { Service } from '../model/service.model';

@Component({
  selector: 'app-my-services-view',
  templateUrl: './my-services-view.component.html',
  styleUrl: './my-services-view.component.css'
})
export class MyServicesViewComponent {
  services: Service[]

  constructor(private servicesService : ServicesService) {

  }

  ngOnInit() {
    this.services = this.servicesService.getAll();
  }
}
