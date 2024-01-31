import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
product: any;

  addToCart(product: any): void {
    this.cartService.addToCart(product);
  }
  selectedProduct: any;
  quantity: number = 1;
  total: number = 0;
  isOrderPlaced: boolean = false;

  constructor(private route: ActivatedRoute, private cartService: CartService,private orderService: OrderService ,private router: Router) {}

  ngOnInit(): void {
    const productParam = this.route.snapshot.paramMap.get('product');
    this.selectedProduct = productParam ? JSON.parse(productParam) : null;
    this.updateTotal();
  }

  updateTotal() {
    this.total = this.selectedProduct.price * this.quantity;
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
  
  Order(product: any) {
    this.router.navigate(['/ordering', { product: JSON.stringify(product) }]);
  }
}
