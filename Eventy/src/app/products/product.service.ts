import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../env/constants';
import {CreateProduct, Product} from './model/products.model';

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

  delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(environment.apiHost + this.prefix + '/' + id);
  }
}
