import { Component } from '@angular/core';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-sellercustomers',
  templateUrl: './sellercustomers.component.html',
  styleUrls: ['./sellercustomers.component.scss']
})
export class SellercustomersComponent {
  customers: any[] = [];
  customerCount: number | undefined;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe(data => {
      this.customers = data;
    });
  }

  addCustomer(): void {
    console.log('Add customer clicked');
  }

  updateCustomer(customerId: number): void {
    console.log(`Update customer clicked for ID: ${customerId}`);
  }

  deleteCustomer(customerId: number): void {
    console.log(`Delete customer clicked for ID: ${customerId}`);
  }
}
