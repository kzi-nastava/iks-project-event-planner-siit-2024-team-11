import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../env/constants';
import {CreateProduct, Product} from './model/products.model';
import { Purchase } from './model/purchase.model';
import { SolutionCard } from '../solutions/model/solution-card.model';
import { SolutionDTO } from '../solutions/model/solutions.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly prefix: string = "/api/products";

  constructor(private httpClient: HttpClient) {

  }

  add(newProduct: CreateProduct): Observable<Product> {
    return this.httpClient.post<Product>(environment.apiHost + this.prefix, newProduct);
  }

  update(newProduct: Product): Observable<Product> {
    return this.httpClient.put<Product>(environment.apiHost + this.prefix + '/' + newProduct.id, newProduct);
  }

  purchase(productId: number, eventId: number): Observable<SolutionDTO> {
    let purchase: Purchase = {productId: productId, eventId: eventId}
    return this.httpClient.post<SolutionDTO>(environment.apiHost + this.prefix + "/purchase", purchase)
  }
}
