import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sellerhome',
  templateUrl: './sellerhome.component.html',
  styleUrls: ['./sellerhome.component.scss']
})
export class SellerhomeComponent {
  constructor(private router: Router) {}

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
  
}
