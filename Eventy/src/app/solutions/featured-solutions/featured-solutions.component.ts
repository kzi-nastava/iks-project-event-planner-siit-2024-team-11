import { Component } from '@angular/core';
import { Solution } from '../model/solutions.model';
import { Product } from '../model/products.model';
import { Service } from '../model/services.model';
import { ReservationConfirmationType } from '../model/services.model';
import { Status } from '../model/category.model';
import { SolutionCard } from '../model/solution-card.model';
import { EventType } from '../../events/model/event-type.model';

@Component({
  selector: 'app-featured-solutions',
  templateUrl: './featured-solutions.component.html',
  styleUrl: './featured-solutions.component.css'
})
export class FeaturedSolutionsComponent {
  featuredSolutions: SolutionCard[];

  constructor() {
    this.featuredSolutions = this.getMockData();
  }

  isService(solutionCard: SolutionCard): boolean {
    return (solutionCard.product === undefined);
  }

  isProduct(solutionCard: SolutionCard): boolean {
    return (solutionCard.service === undefined);
  }

  getMockData(): SolutionCard[] {
    const service1: Service = {
      name: 'Photography',
      category: { name: 'photography', description: 'Neki description', status: Status.ACCEPTED },
      description: 'Professional wedding photography service.',
      price: 1500.0,
      discount: 10,
      imageUrls: ['image1.jpg', 'image2.jpg'],
      isDeleted: false,
      isVisible: true,
      isAvailable: true,
      specifics: 'Full-day photography',
      minReservationTime: 1,
      maxReservationTime: 5,
      reservationDeadline: 7,
      cancellationDeadline: 3,
      reservationType: ReservationConfirmationType.AUTOMATIC
    };

    const service2: Service = {
      name: 'Bon Jovi',
      category: { name: 'music', description: 'Neki description', status: Status.ACCEPTED },
      description: 'Best band ever!',
      price: 800.0,
      discount: 5,
      imageUrls: ['dj1.jpg', 'dj2.jpg'],
      isDeleted: false,
      isVisible: true,
      isAvailable: true,
      specifics: 'Includes sound and lighting equipment',
      minReservationTime: 3,
      maxReservationTime: 3,
      reservationDeadline: 14,
      cancellationDeadline: 7,
      reservationType: ReservationConfirmationType.MANUAL
    };

    const service3: Service = {
      name: 'solution Catering - The best',
      category: { name: 'catering', description: 'Neki description', status: Status.ACCEPTED },
      description: 'Delicious catering service for all types of solutions.',
      price: 1200.0,
      discount: 15,
      imageUrls: ['catering1.jpg', 'catering2.jpg'],
      isDeleted: false,
      isVisible: true,
      isAvailable: true,
      specifics: 'Custom menu available',
      minReservationTime: 2,
      maxReservationTime: 4,
      reservationDeadline: 10,
      cancellationDeadline: 5,
      reservationType: ReservationConfirmationType.AUTOMATIC
    };

    const product1: Product = {
      name: 'Sweet 16 - cake',
      category: { name: 'cake', description: 'Neki description', status: Status.ACCEPTED },
      description: 'Elegant floral centerpiece for your solution.',
      price: 50.0,
      discount: 0,
      imageUrls: ['floral1.jpg', 'floral2.jpg'],
      isDeleted: false,
      isVisible: true,
      isAvailable: true,
      specifics: undefined,
    };

    const product2: Product = {
      name: 'Custom Gift Candy Basket',
      category: { name: 'gifts', description: 'Neki description', status: Status.ACCEPTED },
      description: 'Personalized gift basket for special occasions.',
      price: 75.0,
      discount: 5,
      imageUrls: ['gift1.jpg', 'gift2.jpg'],
      isDeleted: false,
      isVisible: true,
      isAvailable: true,
      specifics: undefined,
    };

    const eventType1 : EventType = {
      name: "Wedding",
      description: "A celebration of marriage, bringing families together to celebrate love and commitment.",
      isActive: true
    }

    const eventType2 : EventType = {
      name: "Conference",
      description: "A professional gathering focused on knowledge sharing, networking, and industry discussions.",
      isActive: true
    }

    const eventType3 : EventType = {
      name: "Concert",
      description: "A live musical performance featuring various artists or bands, offering an unforgettable entertainment experience.",
      isActive: true
    }

    const eventType4 : EventType = {
      name: "Party",
      description: "A social gathering with music, dancing, and fun activities, ideal for celebrations and networking.",
      isActive: true
    }

    const eventType5 : EventType = {
      name: "Meeting",
      description: "A formal gathering for discussing specific business or personal matters, focused on decision-making.",
      isActive: true
    }

    const eventType6 : EventType = {
      name: "Workshop",
      description: "An interactive session aimed at learning new skills, with hands-on activities and expert guidance.",
      isActive: true
    }
    
    return [
      { 
        service: service1,
        product: undefined,
        provider: "Tamara Jezickovic",
        providerImage: "organiser1.jpg",
        eventTypes: [eventType1, eventType4, eventType2]
      },
      { 
        service: undefined,
        product: product1,
        provider: "Zeko Zekic",
        providerImage: "organiser2.jpg",
        eventTypes: [eventType2, eventType4, eventType5]
      },
      { 
        service: service2,
        product: undefined,
        provider: "Taca Jezickovic",
        providerImage: "organiser3.png",
        eventTypes: [eventType1, eventType2, eventType6]
      },
      { 
        service: service3,
        product: undefined,
        provider: "Veselin Jezickovic",
        providerImage: "organiser4.jpg",
        eventTypes: [eventType6, eventType5, eventType2]
      },
      { 
        service: undefined,
        product: product2,
        provider: "Taca Jezic",
        providerImage: "organiser5.jpg",
        eventTypes: [eventType5, eventType3, eventType4]
      },
    ]
  }
}
