import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { catchError, Observable, retry, tap, throwError } from 'rxjs';
import { IProduct } from '../models/product';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService
  ) {}

  products: IProduct[] = [];

  getAll(): Observable<IProduct[]> {
    return this.httpClient
      .get<IProduct[]>('https://fakestoreapi.com/products', {
        params: new HttpParams({ fromObject: { limit: 5 } }),
      })
      .pipe(
        retry(2),
        tap((products) => (this.products = products)),
        catchError(this.errorHandler.bind(this))
      );
  }

  create(product: IProduct) {
    return this.httpClient
      .post<IProduct>('https://fakestoreapi.com/products', product)
      .pipe(tap((products) => this.products.push(product)));
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
