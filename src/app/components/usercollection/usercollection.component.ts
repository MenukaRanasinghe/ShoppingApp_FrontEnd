import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usercollection',
  templateUrl: './usercollection.component.html',
  styleUrls: ['./usercollection.component.scss']
})
export class UsercollectionComponent implements OnInit {
  userCollectionProducts: any[] = [];

  constructor(private productService: ProductService,private router: Router) {}

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
  addToCart(product: any) {
    this.router.navigate(['/cart'], { state: { product } });
  }

  orderProduct(product: any) {
    this.router.navigate(['/ordering', { product: JSON.stringify(product) }]);
  }
}
