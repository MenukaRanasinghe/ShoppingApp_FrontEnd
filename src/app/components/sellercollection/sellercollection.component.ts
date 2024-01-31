import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../product.model';

@Component({
  selector: 'app-sellercollection',
  templateUrl: './sellercollection.component.html',
  styleUrls: ['./sellercollection.component.scss']
})
export class SellercollectionComponent implements OnInit{

  products: any[] = [];
  isNewProductModalOpen = false;
  selectedProductId: number | null = null;
  
  newProduct: Product = {
    id: null,
    name: '',
    colour: '',
    description: '',
    price: null,
    quantity: null,
    category_id: null,
    sizes: '',
    photo: null,
  };
  
  

  constructor(private productService: ProductService, private snackBar: MatSnackBar,private http: HttpClient) {
  
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  addProduct(): void {
    this.resetNewProduct(); 
    this.isNewProductModalOpen = true;
  }

  updateProduct(productId: number): void {
    this.selectedProductId = productId;
    const selectedProduct = this.products.find(product => product.id === productId);

    if (selectedProduct) {
      this.newProduct = { ...selectedProduct };
      this.isNewProductModalOpen = true;
    }
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      data => {
        this.products = data;
      },
      error => {
        console.error('Error loading products', error);
      }
    );
  }

  deleteCollection(productId: any): void {
    const confirmation = window.confirm('Are you sure you want to delete this product?');
  
    if (confirmation) {
      this.productService.deleteCollection(productId).subscribe(
        () => {
          this.snackBar.open(`Product with ID ${productId} deleted successfully`, 'Close', {
            duration: 3000,
          });
          console.log(`Product with ID ${productId} deleted successfully`);
          this.loadProducts();
        },
        (error) => {
          this.snackBar.open(`Error deleting product with ID ${productId}`, 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
          console.error(`Error deleting product with ID ${productId}`, error);
        }
      );
    }
  }
  
  

 
  saveProduct(form: NgForm) {
    if (this.selectedProductId !== null) {
    
      this.productService.updateProduct(this.selectedProductId, this.newProduct).subscribe(
        response => {
          this.snackBar.open(`Product with ID ${this.selectedProductId} updated successfully`, 'Close', {
            duration: 3000,
          });
          console.log(`Product with ID ${this.selectedProductId} updated successfully`, response);
          this.loadProducts();
        },
        error => {
          this.snackBar.open(`Error updating product with ID ${this.selectedProductId}`, 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          console.error(`Error updating product with ID ${this.selectedProductId}`, error);
        }
      );
    } else {
      this.productService.addProduct(this.newProduct).subscribe(
        response => {
          this.snackBar.open('New product added successfully', 'Close', {
            duration: 3000,
          });
          console.log('New product added successfully', response);
          this.loadProducts();
        },
        error => {
          this.snackBar.open('Error adding new product', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          console.error('Error adding new product', error);
        }
      );
    }
  
    this.closeModal();
  }
  

  createFormData(productData: any): FormData {
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
 
  
  resetNewProduct(form?: NgForm) {
    this.selectedProductId = null;
    this.newProduct = {
      id: this.getNextProductId(),
      name: '',
      colour: '',
      description: '',
      price: null,
      quantity: null,
      category_id: null, 
      sizes: '',
      photo: null 
    };
  
    if (form) {
      form.resetForm();
    }
  }
  
  openAddProductModal() {
    this.addProduct(); 
    console.log('Opening modal or form for adding a new product');
  }

  closeModal() {
    this.isNewProductModalOpen = false;
  }

  handlePhotoChange(event: any): void {
    const file = event.target.files[0];
    this.newProduct.photo = file;
  }
  

  getNextProductId(): number {
    const maxId = Math.max(...this.products.map(product => product.id), 0);
    return maxId + 1;
  }
}
