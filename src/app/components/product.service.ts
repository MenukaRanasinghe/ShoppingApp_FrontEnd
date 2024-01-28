import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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

  getProductById(productId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/products/${productId}`);
  }


  addProduct(productData: any): Observable<any> {
    // Create FormData object
    const formData: FormData = new FormData();
  
    // Append file data if available
    if (productData.photo instanceof File) {
      formData.append('photo', productData.photo, productData.photo.name);
    }
  
    // Append other product data fields individually
    formData.append('name', productData.name);
    formData.append('colour', productData.colour);
    formData.append('description', productData.description);
    formData.append('price', String(productData.price));
    formData.append('quantity', String(productData.quantity));
    formData.append('category_id', String(productData.category_id));
    formData.append('sizes', productData.sizes);
  
    // Note: You might need to adjust the field names based on your server's expected input
  
    // Make the POST request with the FormData
    return this.http.post<any>(`${this.apiUrl}/products`, formData)
      .pipe(
        catchError(error => {
          console.error('Error adding new product', error);
        
          // Log detailed information about the error response
          if (error instanceof HttpErrorResponse) {
            console.error('Status:', error.status);
            console.error('Status Text:', error.statusText);
            console.error('Body:', error.error);
          }
        
          throw error;
        })
        
      );
  }
  
  
  
  
  
  
  
  updateProduct(productId: number, product: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/products/${productId}`, product)
      .pipe(
        catchError(error => {
          console.error(`Error updating product with ID ${productId}`, error);
          throw error;
        })
      );
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
