import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-usercollection',
  templateUrl: './usercollection.component.html',
  styleUrls: ['./usercollection.component.scss']
})
export class UsercollectionComponent implements OnInit {
  userCollectionProducts: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (data) => {
        this.userCollectionProducts = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
}
