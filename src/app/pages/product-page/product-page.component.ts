import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { throwError } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { ProductsService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent {
  constructor(
    public productsService: ProductsService,
    public modalService: ModalService
  ) {}

  loading = false;
  title = 'angular app';
  // products$: Observable<IProduct[]>;
  term = '';

  ngOnInit(): void {
    this.loading = true;

    this.productsService.getAll().subscribe(() => (this.loading = false));
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
