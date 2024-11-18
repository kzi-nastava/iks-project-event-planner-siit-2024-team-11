import { Component } from '@angular/core';
import { Solution } from '../model/solutions.model';
import { Product } from '../model/products.model';
import { Service } from '../model/services.model';
import { ReservationConfirmationType } from '../model/services.model';
import { Status } from '../model/category.model';

@Component({
  selector: 'app-featured-solutions',
  templateUrl: './featured-solutions.component.html',
  styleUrl: './featured-solutions.component.css'
})
export class FeaturedSolutionsComponent {
  featuredSolutions: Solution[];

  constructor() {
    this.featuredSolutions = this.getMockData();
  }

  isService(solution: Solution): boolean {
    return (solution as Service).specifics !== undefined;
  }

  isProduct(solution: Solution): boolean {
    return (solution as Product).specifics === undefined;
  }

  getMockData(): Solution[] {
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
      name: 'Event Catering - The best',
      category: { name: 'catering', description: 'Neki description', status: Status.ACCEPTED },
      description: 'Delicious catering service for all types of events.',
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
      description: 'Elegant floral centerpiece for your event.',
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

    return [service1, product1, service2, service3, product2];
  }
}
