import { Injectable } from "@angular/core";
import { CreateService, Service } from "../../model/services.model";
import { Observable, of } from "rxjs";
import { Status } from "../../../solutions/model/category.model";

@Injectable()
export class ServicesServiceMock {
  constructor() { }

  add(newService: CreateService): Observable<Service> {
    let service: Service = {
        id: 42,
        name: newService.name,
        description: newService.description,
        price: newService.price,
        discount: newService.discount,
        imageUrls: newService.imageUrls,
        isVisible: true,
        isAvailable: true,
        category: {
            name: "test",
            description: "test",
            status: Status.ACCEPTED
        },
        relatedEventTypes: [{
            id: 44441,
            name: "test1"
        }],
        specifics: newService.specifics,
        minReservationTime: newService.minReservationTime,
        maxReservationTime: newService.maxReservationTime,
        reservationDeadline: newService.reservationDeadline,
        cancellationDeadline: newService.cancellationDeadline,
        automaticReservationAcceptance: newService.automaticReservationAcceptance
    }
    return of(service)
  }
}