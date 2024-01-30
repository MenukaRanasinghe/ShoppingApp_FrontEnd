import { Component } from '@angular/core';
import { OrderService } from '../order.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  orders: any[] = [];
  orderCount: number | undefined;

  constructor(private orderService: OrderService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(data => {
      this.orders = data;
    });
  }

  addOrder(): void {
    console.log('Add Order clicked');
  }

  updateOrder(orderId: number): void {
    console.log(`Update order clicked for ID: ${orderId}`);
  }


  loadOrders(): void {
    this.orderService.getOrders().subscribe(data => {
      this.orders = data;
    });
  }
  deleteOrder(orderId: any): void {
    const confirmation = window.confirm('Are you sure you want to cancel this order?');
    
    if (confirmation) {
      this.orderService.deleteOrder(orderId).subscribe(
        response => {
          this.snackBar.open(`Order with ID ${orderId} cancelled successfully`, 'Close', {
            duration: 3000,
          });
          console.log(`Order with ID ${orderId} cancelled successfully`, response);
          this.loadOrders();
        },
        error => {
          this.snackBar.open(`Error cancelling order with ID ${orderId}`, 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar'] 
          });
          console.error(`Error cancelling order with ID ${orderId}`, error);
        }
      );
    }
  }
  
}
