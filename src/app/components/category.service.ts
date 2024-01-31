import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categories`);
  }
  getCategoryCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/categories/count`);
  }
  getCategoryById(categoryId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/categories/${categoryId}`);
  }
  addCategory(categoryData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/categories`, categoryData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 
      }),
    })
    .pipe(
      catchError(error => {
        console.error('Error adding new category', error);
        throw error;
      })
    );
  }
  

  updateCategory(categoryId: number, category: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/categories/${categoryId}`, category)
      .pipe(
        catchError(error => {
          console.error(`Error updating product with ID ${categoryId}`, error);
          throw error;
        })
      );
  }

  deleteCategory(categoryId: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/categories/${categoryId}`)
      .pipe(
        catchError(error => {
          console.error(`Error deleting category with ID ${categoryId}`, error);
          throw error;
        })
      );
  }
}