import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { AuthService } from '../auth.service'; 
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  customerId: number = 0; // Initialize with a default value or whatever makes sense in your context
  user: any = {};

  constructor(private customerService: CustomerService, private authService: AuthService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    const loggedInUser = this.authService.getLoggedInUser();

    if (loggedInUser) {
      this.customerId = loggedInUser.id;
      this.getUserDetails();
    }
  }

  getUserDetails(): void {
    this.customerService.getCustomers().subscribe(
      (users) => {
        const foundUser = users.find(user => user.id === this.customerId);

        if (foundUser) {
          this.user = { ...foundUser };
        } else {
          console.warn('User not found');
        }
      },
      (error) => {
        console.error('Error getting user details', error);
      }
    );
  }

  updateCustomer(): void {
    this.customerService.updateCustomer(this.customerId, this.user).subscribe(
      (response) => {
        this.snackBar.open(`User details updated successfully`, 'Close', {
          duration: 3000,
        });
        console.log('User updated successfully', response);
      },
      (error) => {
        this.snackBar.open(`Error updating user details `, 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        console.error('Error updating user', error);
      }
    );
  }
}
