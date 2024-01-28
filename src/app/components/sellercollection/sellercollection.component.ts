import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sellercollection',
  templateUrl: './sellercollection.component.html',
  styleUrls: ['./sellercollection.component.scss']
})
export class SellercollectionComponent {

  products: any[] = [];
  isNewProductModalOpen = false;
  selectedProductId: number | null = null;
  newProduct: any = {
    id: null,
    name: '',
    colour: '',
    description: '',
    price: null,
    quantity: null,
    category_id: null,
    sizes: ''
  };

  constructor(private productService: ProductService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  addProduct(): void {
    this.resetNewProduct(); // Reset newProduct when opening the modal
    this.isNewProductModalOpen = true;
  }

  updateProduct(productId: number): void {
    this.selectedProductId = productId;
    const selectedProduct = this.products.find(product => product.id === productId);

    if (selectedProduct) {
      // Copy selected product data to the new product for editing
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

  deleteProduct(productId: any): void {
    const confirmation = window.confirm('Are you sure you want to delete this product?');
    
    if (confirmation) {
      this.productService.deleteProduct(productId).subscribe(
        response => {
          this.snackBar.open(`Product with ID ${productId} deleted successfully`, 'Close', {
            duration: 3000,
          });
          console.log(`Product with ID ${productId} deleted successfully`, response);
          this.loadProducts();
        },
        error => {
          this.snackBar.open(`Error deleting product with ID ${productId}`, 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar'] 
          });
          console.error(`Error deleting product with ID ${productId}`, error);
        }
      );
    }
  }

  // Method to save the new product or update an existing one
  saveProduct(form: NgForm) {
    if (this.selectedProductId !== null) {
      // Update existing product
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

  // Method to reset the new product form
  resetNewProduct(form?: NgForm) {
    this.selectedProductId = null;
    this.newProduct = {
      id: this.getNextProductId(), // Auto-fill ID when opening the modal
      name: '',
      colour: '',
      description: '',
      price: null,
      quantity: null,
      category_id: null,
      sizes: ''
    };
    if(form){
      form.resetForm();
    }
  }

  openAddProductModal() {
    this.addProduct(); // Directly call addProduct to ensure proper reset
    console.log('Opening modal or form for adding a new product');
  }

  closeModal() {
    this.isNewProductModalOpen = false;
  }

  handlePhotoChange(event: any): void {
    const file = event.target.files[0];
    // Handle photo change logic
  }

  getNextProductId(): number {
    const maxId = Math.max(...this.products.map(product => product.id), 0);
    return maxId + 1;
  }
}
