import { Component, Input } from '@angular/core';
import { Service } from '../model/service.model';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-my-services-view-card',
  templateUrl: './my-services-view-card.component.html',
  styleUrl: './my-services-view-card.component.css'
})
export class MyServicesViewCardComponent {
  @Input()
  service: Service;

  constructor(private servicesService: ServicesService) {

  }

  deleteItem(id: number) {
    this.servicesService.delete(id);
  }
}
