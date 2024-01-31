
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
    const newOrder = {
      id: null,
      total: this.total,
      createdAt: null,
      updatedAt: null,
      user: null,
      products: [this.selectedProduct],
    };
  
    this.orderService.createOrder(newOrder).subscribe(
      (response) => {
        console.log('Order placed successfully:', response);
        this.isOrderPlaced = true;
  
        setTimeout(() => {
          this.isOrderPlaced = false;
          this.router.navigate(['/order']);
        }, 3000);
      },
      (error) => {
        console.error('Error placing the order:', error);
      }
    );
  }
  
 
  
}
