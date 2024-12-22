import { Injectable } from '@angular/core';
import { Service } from '../solutions/model/services.model';
import { SolutionsServiceService } from '../solutions/services/solutions/solutions-service.service';
import { SolutionCard } from '../solutions/model/solution-card.model';
import { Status } from '../solutions/model/category.model';
import { ReservationConfirmationType } from '../solutions/model/services.model';
import { EventTypeForCards } from '../events/model/event-type.model';

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

  get(id: Number): SolutionCard {
    const service1: Service = {
      name: "Tamara's Sweet Shop",
      category: { name: 'catering', description: 'Neki description', status: Status.ACCEPTED },
      description: 'Professional sweets catering service.',
      price: 159.0,
      discount: 0,
      imageUrls: ["pink_shop.webp"],
      isDeleted: false,
      isVisible: true,
      isAvailable: true,
      specifics: 'All kind of sweets!',
      minReservationTime: 60,
      maxReservationTime: 220,
      reservationDeadline: 7,
      cancellationDeadline: 3,
      reservationType: ReservationConfirmationType.AUTOMATIC
    };

    const eventType1 : EventTypeForCards = {
      name: "Wedding",
      description: "A celebration of marriage, bringing families together to celebrate love and commitment.",
      isActive: true
    };

    const eventType2 : EventTypeForCards = {
      name: "Conference",
      description: "A professional gathering focused on knowledge sharing, networking, and industry discussions.",
      isActive: true
    }

    const eventType3 : EventTypeForCards = {
      name: "Concert",
      description: "A live musical performance featuring various artists or bands, offering an unforgettable entertainment experience.",
      isActive: true
    }
    return {
      service: service1,
      product: undefined,
      provider: "Tamara Jezickovic",
      providerImage: "organiser1.jpg",
      eventTypes: [eventType1, eventType2, eventType3]
    }
  }

  add(service: Service) {
    this.serviceList.push(service)
  }
}
