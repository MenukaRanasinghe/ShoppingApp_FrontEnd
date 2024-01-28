import { Component } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-sellercustomers',
  templateUrl: './sellercustomers.component.html',
  styleUrls: ['./sellercustomers.component.scss']
})
export class SellercustomersComponent {
  customers: any[] = [];
  customerCount: number | undefined;

  constructor(private customerService: CustomerService, private snackBar: MatSnackBar) {}

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
          this.snackBar.open(`Customer with ID ${customerId} deleted successfully`, 'Close', {
            duration: 3000,
          });
          console.log(`Customer with ID ${customerId} deleted successfully`, response);
          this.loadCustomers();
        },
        error => {
          this.snackBar.open(`Error deleting customer with ID ${customerId}`, 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar'] 
          });
          console.error(`Error deleting customer with ID ${customerId}`, error);
        }
      );
    }
  }


}
