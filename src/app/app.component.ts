import { Component, OnInit } from '@angular/core';
import { IProduct } from './models/product';
import { products as data } from './data/products';
import { ProductsService } from './services/product.service';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    public modalService: ModalService
  ) {}

  loading = false;
  title = 'angular app';
  products$: Observable<IProduct[]>;
  term = '';

  ngOnInit(): void {
    this.loading = true;

    this.products$ = this.productsService.getAll().pipe(
      tap(() => (this.loading = false)),
      catchError(this.errorHandler)
    );
  }

  private errorHandler(error: HttpErrorResponse) {
    return throwError(() => error.message);
  }

  // ngOnInit(): void {
  //   this.loading = true;
  //   this.productsService.getAll().subscribe((products) => {
  //     this.products = products;
  //     this.loading = false;
  //   });
  // }
}
