import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(
      'https://fakestoreapi.com/products',
      {
        params: new HttpParams({ fromObject: { limit: 5 } }),
      }
    );
  }
}
