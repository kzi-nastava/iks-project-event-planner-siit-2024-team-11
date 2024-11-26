import { Injectable } from '@angular/core';
import {Organizer, Provider, User} from './model/users.model';
import {EventCard} from '../events/model/event-card.model';
import {EventType} from '../events/model/event-type.model';
import {Location} from '../events/model/location.model';
import {Event, PrivacyType} from '../events/model/events.model';
import {SolutionCard} from '../solutions/model/solution-card.model';
import {ReservationConfirmationType, Service} from '../solutions/model/services.model';
import {Status} from '../solutions/model/category.model';
import {Product} from '../solutions/model/products.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users : (Organizer | Provider | User)[] = [
    {
      email : "user1@gmail.com",
      password : "password1",
      address : "Neka Ulica 4",
      phoneNumber : "05334564",
      firstName : "Ime",
      lastName : "Prezime"
    },
    {
      email : "user2@gmail.com",
      password : "password2",
      address : "Jos Neka Ulica 28",
      phoneNumber : "0493913438",
      name : "Moja kompanija",
      description : "Opis kompanije"
    },
    {
      email : "user3@gmail.com",
      password : "password3",
      address : "Ulica Ovo 32",
      phoneNumber : "+3224 3234 13"
    }
  ];

  login(email : string, password : string) : User | Provider | Organizer | null {
    for(let user of this.users) {
      if(user.email === email && user.password === password ) {
        return user;
      }
    }

    return null;
  }

  register(newUser: (Organizer | Provider)) : void {
    this.users.push(newUser);
  }

  getMyEvents(): EventCard[] {
    // Event Types
    const weddingType: EventType = { name: 'Wedding', description: 'A celebration of marriage', isActive: true };
    const conferenceType: EventType = { name: 'Conference', description: 'Professional gathering for knowledge exchange', isActive: true };
    const concertType: EventType = { name: 'Concert', description: 'Live musical performance', isActive: true };
    const partyType: EventType = { name: 'Party', description: 'A social gathering with music and dancing', isActive: true };
    const meetingType: EventType = { name: 'Meeting', description: 'A formal gathering of individuals for a specific purpose', isActive: true };

    // Locations
    const weddingLocation: Location = { name: 'Grand Hall', address: '123 Wedding St, Cityville', latitude: 40.7128, longitude: -74.0060 };
    const conferenceLocation: Location = { name: 'Tech Center', address: '456 Innovation Blvd, Tech City', latitude: 37.7749, longitude: -122.4194 };
    const concertLocation: Location = { name: 'Stadium Arena', address: '789 Music Ave, Townsville', latitude: 34.0522, longitude: -118.2437 };
    const partyLocation: Location = { name: 'Luxe Lounge', address: '101 Party Ln, Fun Town', latitude: 51.5074, longitude: -0.1278 };
    const meetingLocation: Location = { name: 'Boardroom', address: '200 Corporate Rd, Business Park', latitude: 42.3601, longitude: -71.0589 };

    // Featured Events
    const event1: Event = {
      name: "M & J's Wedding",
      description: "M & J's Wedding is a majestic and heartwarming celebration of two souls coming together to embark on a lifelong journey of love and unity. This enchanting event will be held in the beautifully adorned Grand Hall, a place known for its timeless elegance and grandeur. Guests will witness a heartfelt exchange of vows and experience a ceremony filled with love, joy, and laughter. Every detail, from the lush floral arrangements to the soothing live music, has been meticulously planned to create an atmosphere of grace and beauty. Attendees will enjoy an exquisite dinner followed by a lively evening of dancing and celebration. The couple has prepared a special surprise for their guests, ensuring unforgettable memories. As day turns to night, the Grand Hall will be illuminated by thousands of fairy lights, adding a magical glow to an already stunning venue.",
      maxParticipants: 200,
      privacyType: PrivacyType.PUBLIC,
      date: new Date(),
      location: weddingLocation,
      eventType: weddingType
    }

    const event2: Event = {
      name: 'Tech Conference',
      description: "A gathering of tech leaders at the Tech Center for keynotes, panels, and workshops on innovation. Network with industry professionals, explore the latest advancements, and engage in thought-provoking discussions about technology's future.",
      maxParticipants: 500,
      privacyType: PrivacyType.PRIVATE,
      date: new Date(),
      location: conferenceLocation,
      eventType: conferenceType
    }

    const event3: Event = {
      name: 'Summer Music Concert',
      description: "The Summer Music Concert is a night of electrifying live performances at the iconic Stadium Arena. Featuring a diverse lineup of artists, the event promises a blend of pulsating pop, soulful ballads, and rock anthems.",
      maxParticipants: 1000,
      privacyType: PrivacyType.PUBLIC,
      date: new Date(),
      location: concertLocation,
      eventType: concertType
    }
    const event4: Event = {
      name: 'VIP PartyLounge',
      description: "The VIP PartyLounge is an exclusive, invitation-only social event where style and sophistication converge in a luxurious setting. Taking place at the upscale Luxe Lounge, guests will be greeted with a red carpet welcome and ushered into a world of opulence and glamour. The party will feature premium cocktails, gourmet hors d'oeuvres, and a curated selection of fine wines and champagnes. Renowned DJs will keep the dance floor alive with an energetic mix of music, while quieter areas will provide a space for intimate conversations and relaxed mingling. Throughout the night, there will be surprises, including live entertainment acts and personalized gifts for attendees. Attendees are encouraged to dress to impress, as the event will be full of fashion and flair. Security will ensure a safe, comfortable environment, making it a memorable night of elegance and excitement. Exclusive networking opportunities abound, with prominent figures from business, entertainment, and art in attendance.",
      maxParticipants: 100,
      privacyType: PrivacyType.PRIVATE,
      date: new Date(),
      location: partyLocation,
      eventType: partyType
    }

    const event5: Event = {
      name: 'Business Meeting',
      description: "A focused gathering at the Boardroom to discuss future strategies, review performance, and brainstorm solutions. Key sessions will inspire collaboration, with a motivational talk and a Q&A to align on upcoming goals.",
      maxParticipants: 30,
      privacyType: PrivacyType.PUBLIC,
      date: new Date(),
      location: meetingLocation,
      eventType: meetingType
    }

    return [
      {
        event: event1,
        organiser: "Tamara Jezickovic",
        organiserImage: "organiser1.jpg",
      },
      {
        event: event2,
        organiser: "Zeko Zekic",
        organiserImage: "organiser2.jpg",
      },
      {
        event: event3,
        organiser: "Taca Jezickovic",
        organiserImage: "organiser3.png",
      },
      {
        event: event4,
        organiser: "Veselin Jezickovic",
        organiserImage: "organiser4.jpg",
      },
      {
        event: event5,
        organiser: "Taca Jezic",
        organiserImage: "organiser5.jpg",
      },
    ]
  }

  getMySolutions(): SolutionCard[] {
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
      price: 99999.99,
      discount: 0,
      imageUrls: ["bon_jovi.webp"],
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
      name: 'Catering - The best',
      category: { name: 'catering', description: 'Neki description', status: Status.ACCEPTED },
      description: 'Delicious catering service for all types of solutions.',
      price: 150.0,
      discount: 15,
      imageUrls: ["pink_chanel.jpg"],
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
      description: 'Make your Sweet 16 unforgettable with a stunning floral-themed cake centerpiece. Designed to impress, this elegant cake adds a touch of sophistication to your special celebration.',
      price: 99.99,
      discount: 10,
      imageUrls: ["pink_cake.jpg"],
      isDeleted: false,
      isVisible: true,
      isAvailable: true,
      specifics: undefined,
    };

    const product2: Product = {
      name: 'Custom Gift Flowers',
      category: { name: 'gifts', description: 'Neki description', status: Status.ACCEPTED },
      description: 'Delight your loved ones with a personalized flowers, perfect for any special occasion. Filled with a selection of sweet treats, this custom gift adds a thoughtful and memorable touch.',
      price: 49.50,
      discount: 0,
      imageUrls: ["roses.jpg"],
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
