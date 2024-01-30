import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sellercollection',
  templateUrl: './sellercollection.component.html',
  styleUrls: ['./sellercollection.component.scss']
})
export class SellercollectionComponent implements OnInit{

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
    sizes: '',
    photo: null
  };
  

  constructor(private productService: ProductService, private snackBar: MatSnackBar) {
  
  }

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
    // Determine the operation (update or add)
    const operation = this.selectedProductId !== null ? 'update' : 'add';
  
    const operations = {
      'update': {
        successMessage: `Product with ID ${this.selectedProductId} updated successfully`,
        errorMessage: `Error updating product with ID ${this.selectedProductId}`,
        serviceMethod: (id: number, product: any) => this.productService.updateProduct(id, product),
      },
      'add': {
        successMessage: 'New product added successfully',
        errorMessage: 'Error adding new product',
        serviceMethod: (product: any) => this.productService.addProduct(product),
      },
    };
  
    const { successMessage, errorMessage, serviceMethod } = operations[operation];
  
    if (operation === 'update' && typeof this.selectedProductId !== 'number') {
      // Handle the case where this.selectedProductId is not a number
      console.error('Invalid product ID');
      return;
    }
  
    // Use 'number' as the type for product ID
    serviceMethod(this.selectedProductId as number, this.newProduct as any).subscribe(
      response => {
        // Handle success
        this.snackBar.open(successMessage, 'Close', { duration: 3000 });
        console.log(successMessage, response);
        this.loadProducts();
      },
      error => {
        // Handle error
        this.snackBar.open(errorMessage, 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
        console.error(errorMessage, error);
      }
    );
  
    // Close the modal or perform any other necessary cleanup
    this.closeModal();
  }
  
  
  

  // Method to reset the new product form
  resetNewProduct(form?: NgForm) {
    this.selectedProductId = null;
    this.newProduct = {
      id: this.getNextProductId(),
      name: '',
      colour: '',
      description: '',
      price: null,
      quantity: null,
      category_id: null,  // Set to null or a default value
      sizes: '',
      photo: null  // Add this line to include the 'photo' property
    };
  
    if (form) {
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
    this.newProduct.photo = file;
  }
  

  getNextProductId(): number {
    const maxId = Math.max(...this.products.map(product => product.id), 0);
    return maxId + 1;
  }
}
