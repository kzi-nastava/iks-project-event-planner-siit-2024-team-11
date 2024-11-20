import { Component, Input } from '@angular/core';
import { Service } from '../../solutions/model/services.model';

@Component({
  selector: 'app-my-services-view-card',
  templateUrl: './my-services-view-card.component.html',
  styleUrl: './my-services-view-card.component.css'
})
export class MyServicesViewCardComponent {
  @Input() service: Service;

}
