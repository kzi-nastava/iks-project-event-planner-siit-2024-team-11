import { Injectable } from '@angular/core';
import { EventCard } from '../../model/event-card.model';
import { EventTypeForCards } from '../../model/event-type.model';
import { Location } from '../../model/location.model';
import {Event, OrganizeEvent} from '../../model/events.model';
import { PrivacyType } from '../../model/events.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../env/constants';

@Injectable({
  providedIn: 'root'
})
export class EventsServiceService {
  allEvents: EventCard[] = [];
  featuredEvents: EventCard[] = [];

  private readonly urlPrefix: string = "/api/events";

  constructor(private httpClient: HttpClient) {
    this.allEvents = this.getAllEvents();
    this.featuredEvents = this.getFeaturedEvents();
  }

  getAllEvents(): EventCard[] {
    // Event Types
    const weddingType: EventTypeForCards = { name: 'Wedding', description: 'A celebration of marriage', isActive: true };
    const conferenceType: EventTypeForCards = { name: 'Conference', description: 'Professional gathering for knowledge exchange', isActive: true };
    const concertType: EventTypeForCards = { name: 'Concert', description: 'Live musical performance', isActive: true };
    const partyType: EventTypeForCards = { name: 'Party', description: 'A social gathering with music and dancing', isActive: true };
    const meetingType: EventTypeForCards = { name: 'Meeting', description: 'A formal gathering of individuals for a specific purpose', isActive: true };

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

  getFeaturedEvents(): EventCard[] {
    // Event Types
    const weddingType: EventTypeForCards = { name: 'Wedding', description: 'A celebration of marriage', isActive: true };
    const conferenceType: EventTypeForCards = { name: 'Conference', description: 'Professional gathering for knowledge exchange', isActive: true };
    const concertType: EventTypeForCards = { name: 'Concert', description: 'Live musical performance', isActive: true };
    const partyType: EventTypeForCards = { name: 'Party', description: 'A social gathering with music and dancing', isActive: true };
    const meetingType: EventTypeForCards = { name: 'Meeting', description: 'A formal gathering of individuals for a specific purpose', isActive: true };

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

  organizeEvent(event: OrganizeEvent): Observable<Event> {
    return this.httpClient.post<Event>(environment.apiHost + this.urlPrefix, event);
  }
}
