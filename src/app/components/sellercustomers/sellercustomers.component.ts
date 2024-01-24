import { Component } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Observable } from 'rxjs';


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

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe(data => {
      this.customers = data;
    });
  }
  deleteCustomer(customerId: any): void {
    const confirmation = window.confirm('Are you sure you want to delete this customer?');
    
    if (confirmation) {
      this.customerService.deleteCustomer(customerId).subscribe(
        response => {
          console.log(`Customer with ID ${customerId} deleted successfully`, response);
          this.loadCustomers();
        },
        error => {
          console.error(`Error deleting customer with ID ${customerId}`, error);
        }
      );
    }
  }


}
