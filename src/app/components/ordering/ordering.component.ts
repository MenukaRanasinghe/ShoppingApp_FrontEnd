// order.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order',
  templateUrl: './ordering.component.html',
  styleUrls: ['./ordering.component.scss']
})
export class OrderingComponent implements OnInit {
  selectedProduct: any;
  quantity: number = 1;
  total: number = 0;
  isOrderPlaced: boolean = false;

  constructor(private route: ActivatedRoute, private orderService: OrderService,private router: Router) {}

  ngOnInit(): void {
    const productParam = this.route.snapshot.paramMap.get('product');
    this.selectedProduct = productParam ? JSON.parse(productParam) : null;
    this.updateTotal();
  }

  updateTotal() {
    this.total = this.selectedProduct.price * this.quantity;
  }

  increaseQuantity() {
    this.quantity++;
    this.updateTotal();
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.updateTotal();
    }
  }

  confirmOrder() {
    // Create an order object with relevant details
    const newOrder = {
      id: null, // This will be assigned by the server
      total: this.total,
      createdAt: null, // This will be assigned by the server
      updatedAt: null, // This will be assigned by the server
      user: null, // Assign the actual user if applicable
      products: [this.selectedProduct], // Add the selected product to the order
    };
  
    // Call the OrderService to save the order
    this.orderService.createOrder(newOrder).subscribe(
      (response) => {
        console.log('Order placed successfully:', response);
        this.isOrderPlaced = true;
  
        // Display the message box for 3 seconds (3000 milliseconds)
        setTimeout(() => {
          this.isOrderPlaced = false; // Hide the message box after 3 seconds
          // Navigate to a different page after placing the order
          this.router.navigate(['/order']);
        }, 3000);
      },
      (error) => {
        console.error('Error placing the order:', error);
      }
    );
  }
  
  
}
