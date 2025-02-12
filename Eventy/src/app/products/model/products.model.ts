import {CategoryWithId} from '../../solutions/model/category-with-id.model';
import {EventTypeCard} from '../../events/model/events.model';

export interface CreateProduct {
  name: string;
  description: string;
  price: number;
  discount: number;
  imageUrls: string[];
  category: CategoryWithId;
  relatedEventTypes: EventTypeCard[];
  isVisible: boolean;
  isAvailable: boolean;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount: number;
  images: string[];
  relatedEventTypes: EventTypeCard[];
  isVisible: boolean;
  isAvailable: boolean;
}
