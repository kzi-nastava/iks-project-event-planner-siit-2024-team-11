import { Component, Input } from '@angular/core';
import { Service } from '../../solutions/model/services.model';
import { SolutionCard } from '../../solutions/model/solution-card.model';


@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.css'
})
export class ServiceCardComponent {
  @Input() serviceCard: SolutionCard;

}
