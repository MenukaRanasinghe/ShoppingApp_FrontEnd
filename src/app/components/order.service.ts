import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/orders`);
  }
  getOrderCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/orders/count`);
  }
  deleteOrder(orderId: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/orders/${orderId}`)
      .pipe(
        catchError(error => {
          console.error(`Error deleting customer with ID ${orderId}`, error);
          throw error;
        })
      );
  }
}