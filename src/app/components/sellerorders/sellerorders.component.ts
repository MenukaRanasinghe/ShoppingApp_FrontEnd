import { Component } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-sellerorders',
  templateUrl: './sellerorders.component.html',
  styleUrls: ['./sellerorders.component.scss']
})
export class SellerordersComponent {
  orders: any[] = [];
  orderCount: number | undefined;

  constructor(private orderService: OrderService) {}

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

  deleteOrder(orderId: number): void {
    console.log(`Delete order clicked for ID: ${orderId}`);
  }
  
}
