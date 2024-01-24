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

  deleteProduct(productId: number): void {
    console.log(`Delete product clicked for ID: ${productId}`);
  }
}
