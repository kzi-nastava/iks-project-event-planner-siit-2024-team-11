import { Injectable } from '@angular/core';
import { Service } from './model/service.model';

const services: Service[] = [
  { id: 1, pupId: 101, name: 'Spa Massage', description: 'A relaxing full-body massage to relieve stress and tension.', price: 100, discount: 10, imageURLs: ['url1'], isDeleted: false, isVisible: true, isAvailable: true, specifics: '60-minute full-body massage, aromatherapy included', reservationDuration: [1, 2], reservationDeadline: 48, isAutomaticallyAccepted: false },
  { id: 2, pupId: 102, name: 'Yoga Class', description: 'A guided yoga session to improve flexibility and strength.', price: 200, discount: 15, imageURLs: ['url2'], isDeleted: false, isVisible: true, isAvailable: true, specifics: '45-minute group session for all levels', reservationDuration: [1, null], reservationDeadline: 72, isAutomaticallyAccepted: true },
  { id: 3, pupId: 103, name: 'Personal Training', description: 'One-on-one training to achieve your fitness goals.', price: 300, discount: 20, imageURLs: ['url3'], isDeleted: false, isVisible: true, isAvailable: true, specifics: '60-minute personalized workout with a certified trainer', reservationDuration: [2, 4], reservationDeadline: 24, isAutomaticallyAccepted: true },
  { id: 4, pupId: 101, name: 'Facial Treatment', description: 'Deep cleansing and rejuvenating facial for glowing skin.', price: 150, discount: 5, imageURLs: ['url4'], isDeleted: false, isVisible: true, isAvailable: true, specifics: '30-minute facial with hydrating mask and gentle exfoliation', reservationDuration: [1, null], reservationDeadline: 48, isAutomaticallyAccepted: false },
  { id: 5, pupId: 102, name: 'Pilates Class', description: 'Strengthen your core and improve posture with Pilates exercises.', price: 250, discount: 10, imageURLs: ['url5'], isDeleted: false, isVisible: true, isAvailable: true, specifics: '1-hour class with focus on flexibility and muscle tone', reservationDuration: [1, 3], reservationDeadline: 72, isAutomaticallyAccepted: true },
  { id: 6, pupId: 103, name: 'Nutritional Consultation', description: 'Get personalized nutrition advice tailored to your needs.', price: 350, discount: 25, imageURLs: ['url6'], isDeleted: false, isVisible: true, isAvailable: true, specifics: '1-hour session with a certified nutritionist', reservationDuration: [2, 4], reservationDeadline: 24, isAutomaticallyAccepted: true },
  { id: 7, pupId: 101, name: 'Aromatherapy Session', description: 'Therapeutic essential oils used to enhance well-being.', price: 120, discount: 8, imageURLs: ['url7'], isDeleted: false, isVisible: true, isAvailable: true, specifics: '45-minute session with customized essential oil blend', reservationDuration: [1, null], reservationDeadline: 48, isAutomaticallyAccepted: false },
  { id: 8, pupId: 102, name: 'Group Fitness Class', description: 'Join a high-energy workout with other fitness enthusiasts.', price: 220, discount: 18, imageURLs: ['url8'], isDeleted: false, isVisible: true, isAvailable: true, specifics: '1-hour session with cardio and strength training', reservationDuration: [1, 3], reservationDeadline: 72, isAutomaticallyAccepted: true },
  { id: 9, pupId: 103, name: 'Reiki Healing', description: 'Energy healing therapy to restore balance and promote relaxation.', price: 270, discount: 12, imageURLs: ['url9'], isDeleted: false, isVisible: true, isAvailable: true, specifics: '60-minute session with a certified Reiki master', reservationDuration: [2, 4], reservationDeadline: 24, isAutomaticallyAccepted: true },
  { id: 10, pupId: 101, name: 'Deep Tissue Massage', description: 'Intensive massage therapy targeting deeper layers of muscle tissue.', price: 180, discount: 10, imageURLs: ['url10'], isDeleted: false, isVisible: true, isAvailable: true, specifics: '60-minute session focused on muscle tension relief', reservationDuration: [1, null], reservationDeadline: 48, isAutomaticallyAccepted: false }
];


@Injectable({
  providedIn: 'root'
})
export class ServicesServiceService {
  private serviceList: Service[];

  constructor() {
    for (let serviceObject of services) {
      const service: Service = {
        id: serviceObject.id,
        pupId: serviceObject.pupId,
        name: serviceObject.name,
        description: serviceObject.description,
        price: serviceObject.price,
        discount: serviceObject.discount,
        imageURLs: serviceObject.imageURLs,
        isDeleted: serviceObject.isDeleted,
        isVisible: serviceObject.isVisible,
        isAvailable: serviceObject.isAvailable,
        specifics: serviceObject.specifics,
        reservationDuration: serviceObject.reservationDuration,
        reservationDeadline: serviceObject.reservationDeadline,
        isAutomaticallyAccepted: serviceObject.isAutomaticallyAccepted,
      }
      this.serviceList.push(service)
    }   
  }

  getAllCreatedById(pupId: number): Service[] {
    return this.serviceList.filter(service => service.pupId === pupId);
  }

  getAll(): Service[] {
    return this.serviceList;
  }

  getById(id: number): Service | undefined {
    return this.serviceList.find(service => service.id === id);
  }

  add(service: Service) {
    this.serviceList.push(service)
  }

  update(service: Service, oldId: number): boolean {
    let index: number = this.serviceList.findIndex(service => service.id === oldId)
    if (index !== -1) {
      this.serviceList[index] = service;
      return true;
    }
    return false;
  }

  delete(id: number): boolean {
    if (this.serviceList.findIndex(service => service.id === id) !== -1) {
      this.serviceList = this.serviceList.filter(service => service.id !== id)
      return true;
    }
    return false;
  }
}
