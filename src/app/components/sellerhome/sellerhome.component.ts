import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';
import { CategoryService } from '../category.service';
import { CustomerService } from '../customer.service';
import { ProductService } from '../product.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-sellerhome',
  templateUrl: './sellerhome.component.html',
  styleUrls: ['./sellerhome.component.scss']
})
export class SellerhomeComponent implements OnInit {
  orderCount$!: Observable<number | undefined>;
  customerCount$!: Observable<number | undefined>;
  collectionCount$!: Observable<number | undefined>;
  categoryCount$!: Observable<number | undefined>;

  constructor(private router: Router, private orderService: OrderService, private customerService: CustomerService,private categoryService: CategoryService, private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchOrderCount();
    this.fetchCategoryCount();
    this.fetchProductCount();
    this.fetchCustomerCount();
  }
 

  navigateToSellerOrders(): void {
    this.router.navigate(['/sellerorders']);
  }

  navigateToSellerCustomers(): void {
    this.router.navigate(['/sellercustomers']);
  }

  navigateToSellerCollection(): void {
    this.router.navigate(['/sellercollection']);
  }

  navigateToSellerCategories(): void {
    this.router.navigate(['/sellercategories']);
  }

  fetchOrderCount(): void {
    this.orderService.getOrderCount().subscribe(
      count => {
        console.log('Received order count:', count);
        this.orderCount$ = of(count);
      },
      error => {
        console.error('Error fetching order count:', error);
      }
    );
  }
  fetchCustomerCount(): void {
    this.customerService.getCustomerCount().subscribe(
      count => {
        console.log('Received customer count:', count);
        this.customerCount$ = of(count);
      },
      error => {
        console.error('Error fetching customer count:', error);
      }
    );
  }
  fetchCategoryCount(): void {
    this.categoryService.getCategoryCount().subscribe(
      count => {
        console.log('Received category count:', count);
        this.categoryCount$ = of(count);
      },
      error => {
        console.error('Error fetching catgory count:', error);
      }
    );
  }
  fetchProductCount(): void {
    this.productService.getProductCount().subscribe(
      count => {
        console.log('Received collection count:', count);
        this.collectionCount$ = of(count);
      },
      error => {
        console.error('Error fetching collectin count:', error);
      }
    );
  }
}
