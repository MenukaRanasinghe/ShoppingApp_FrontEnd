import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }
  getCustomerCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/users/count`);
  }
  addCustomer(customerData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, customerData);
  }
  deleteCustomer(customerId: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/users/${customerId}`)
      .pipe(
        catchError(error => {
          console.error(`Error deleting customer with ID ${customerId}`, error);
          throw error;
        })
      );
  }
  updateCustomer(customerId: number, customer: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/${customerId}`, customer)
      .pipe(
        catchError(error => {
          console.error(`Error updating user with ID ${customerId}`, error);
          throw error;
        })
      );
  }
  
}