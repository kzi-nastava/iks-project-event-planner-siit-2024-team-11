import { Component } from '@angular/core';
import { Solution } from '../model/solutions.model';
import { Product } from '../model/products.model';
import { Service } from '../model/services.model';
import { ReservationConfirmationType } from '../model/services.model';
import { Status } from '../model/category.model';
import { SolutionCard } from '../model/solution-card.model';

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
    return (solutionCard.solution as Service).specifics !== undefined;
  }

  isProduct(solutionCard: SolutionCard): boolean {
    return (solutionCard.solution as Product).specifics === undefined;
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
      minReservationTime: 30,
      maxReservationTime: 180,
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
      minReservationTime: 60,
      maxReservationTime: 120,
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
      minReservationTime: 30,
      maxReservationTime: 150,
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

    return [
      { 
        solution: service1,
        provider: "Tamara Jezickovic",
        providerImage: "organiser1.jpg",
      },
      { 
        solution: product2,
        provider: "Zeko Zekic",
        providerImage: "organiser2.jpg",
      },
      { 
        solution: service2,
        provider: "Taca Jezickovic",
        providerImage: "organiser3.png",
      },
      { 
        solution: service3,
        provider: "Veselin Jezickovic",
        providerImage: "organiser4.jpg",
      },
      { 
        solution: product2,
        provider: "Taca Jezic",
        providerImage: "organiser5.jpg",
      },
    ]
  }
}
