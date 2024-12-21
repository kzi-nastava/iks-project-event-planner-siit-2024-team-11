import { EventTypeForCards } from "../../events/model/event-type.model";
import { Product } from "./products.model";
import { Service } from "./services.model";

export interface SolutionCard {
   service: Service,
   product: Product,
   provider: string,
   providerImage: string,
   eventTypes: EventTypeForCards[],
}
