import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) {}
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

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

    
    const options = {};

    return this.http.post<any>(`${this.apiUrl}/products`, formData, options)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Add Product Error:', error);
          return throwError('Error adding product. Please try again later.');
        })
      );
  }
  saveProduct(product: Product): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/products`, product)
      .pipe(
        catchError(error => {
          console.error('Add Product Error:', error);
          throw error;
        })
      );
  }
  

  
  

  updateProduct(productId: number, updatedData: any): Observable<any> {
    const url = `${this.apiUrl}/products/${productId}`;
    const formData: FormData = this.createFormData(updatedData);
  
    return this.http.put(url, formData, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  
  
  
  
  deleteCollection(productId: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/products/${productId}`)
      .pipe(
        catchError(error => {
          console.error(`Error deleting product with ID ${productId}`, error);
          throw error;
        })
      );
  }
  
  private handleError(error: HttpErrorResponse) {
    console.error('Error:', error);
    return throwError('Something went wrong; please try again later.');
  }

  private createFormData(productData: any): FormData {
    const formData: FormData = new FormData();

    if (productData && productData.photo && productData.photo instanceof File) {
      formData.append('photo', productData.photo, productData.photo.name || 'default_filename');
    } else {
      console.warn('Photo data is missing or invalid. Using default photo.');
      formData.append('photo', new File([], 'default_filename'));
    }
   
    formData.append('name', productData && productData.name ? productData.name : '');
    formData.append('colour', productData && productData.colour ? productData.colour : '');
    formData.append('description', productData && productData.description ? productData.description : '');
    formData.append('price', String(productData && productData.price ? productData.price : '0'));
    formData.append('quantity', String(productData && productData.quantity ? productData.quantity : '0'));
  
    if (productData && productData.category_id) {
      if (Array.isArray(productData.category_id)) {
        formData.append('category_id', JSON.stringify(productData.category_id));
      } else {
        formData.append('category_id', JSON.stringify({ id: productData.category_id }));
      }
    }
  
    formData.append('sizes', productData && productData.sizes ? productData.sizes : '');
  
    return formData;
  }
  
  
}
