import { Component } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-sellercollection',
  templateUrl: './sellercollection.component.html',
  styleUrls: ['./sellercollection.component.scss']
})
export class SellercollectionComponent {
  products: any[] = [];
  productCount: number | undefined;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  addProduct(): void {
    console.log('Add product clicked');
  }

  updateProduct(productId: number): void {
    console.log(`Update product clicked for ID: ${productId}`);
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }
  deleteProduct(productId: any): void {
    const confirmation = window.confirm('Are you sure you want to delete this product?');
    
    if (confirmation) {
      this.productService.deleteProduct(productId).subscribe(
        response => {
          console.log(`Product with ID ${productId} deleted successfully`, response);
          this.loadProducts();
        },
        error => {
          console.error(`Error deleting product with ID ${productId}`, error);
        }
      );
    }
  }
}
