import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products`);
  }
  getProductCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/products/count`);
  }
  deleteProduct(productId: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/products/${productId}`)
      .pipe(
        catchError(error => {
          console.error(`Error deleting product with ID ${productId}`, error);
          throw error;
        })
      );
  }
}