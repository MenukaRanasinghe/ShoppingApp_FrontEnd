import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-usercollection',
  templateUrl: './usercollection.component.html',
  styleUrls: ['./usercollection.component.scss']
})
export class UsercollectionComponent implements OnInit {
  userCollectionProducts: any[] = [];

  constructor(private productService: ProductService,private router: Router,private cartService: CartService) {}

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


  orderProduct(product: any) {
    this.router.navigate(['/ordering', { product: JSON.stringify(product) }]);
  }
  addToCart(product: any): void {
    this.router.navigate(['/cart', { product: JSON.stringify(product) }]);
  }

}
