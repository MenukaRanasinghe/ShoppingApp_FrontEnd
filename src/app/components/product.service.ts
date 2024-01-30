import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
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
    const formData: FormData = this.createFormData(productData);
  
    return this.http.post<any>(`${this.apiUrl}/products`, formData)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Add Product Error:', error);
          return throwError('Error adding product. Please try again later.');
        })
      );
  }
  

  updateProduct(productId: number, updatedData: any): Observable<any> {
    const formData: FormData = this.createFormData(updatedData);
  
    const url = `${this.apiUrl}/products/${productId}`;
  
    return this.http.put(url, formData).pipe(
      catchError(this.handleError)
    );
  }
  

  deleteProduct(productId: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/products/${productId}`)
      .pipe(
        catchError(this.handleError)
      );
  }


  private createFormData(productData: any): FormData {
    const formData: FormData = new FormData();
  
    if (productData && productData.photo && productData.photo instanceof File) {
      formData.append('photo', productData.photo, productData.photo.name || 'default_filename');
    } else {
      console.error('Photo data is missing or invalid.');
    }
  
    formData.append('name', productData && productData.name ? productData.name : '');
    formData.append('colour', productData && productData.colour ? productData.colour : '');
    formData.append('description', productData && productData.description ? productData.description : '');
    formData.append('price', String(productData && productData.price ? productData.price : '0'));
    formData.append('quantity', String(productData && productData.quantity ? productData.quantity : '0'));
  
    if (productData && productData.category_id) {
      // Send category as an object with an 'id' field
      formData.append('category_id', JSON.stringify({ id: productData.category_id }));
    }
  
    formData.append('sizes', productData && productData.sizes ? productData.sizes : '');
  
    return formData;
  }
  


  handleError(error: HttpErrorResponse): Observable<any> {
    console.error('Error:', error);
    return throwError(error);  // Rethrow the original error
  }
  
  
}
