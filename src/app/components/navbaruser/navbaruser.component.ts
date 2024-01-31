import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-navbaruser',
  templateUrl: './navbaruser.component.html',
  styleUrls: ['./navbaruser.component.scss']
})
export class NavbaruserComponent {
  selectedTab: string = ''; // Initialize as needed
  showLogoutButton: boolean = false;
  showConfirmation: boolean = false;

  constructor(private router: Router,private cdr: ChangeDetectorRef) {}

  selectTab(tab: string): void {
    this.selectedTab = tab;
    // Add logic to navigate to the selected tab
  }

  toggleLogoutButton(): void {
    this.showLogoutButton = !this.showLogoutButton;
  }

  toggleConfirmation(): void {
    this.showConfirmation = !this.showConfirmation;
  }
   

  confirmLogout(): void {
    // Perform logout logic
    console.log('Logout confirmed!');
    // You can add more logout logic here
  
    // Navigate to the login page
    this.router.navigate(['/login']);
  
    // Reset state
    this.showConfirmation = false; // Set it to false to hide the confirmation modal
    this.showLogoutButton = false;
  }
  

  cancelConfirmation(): void {
    this.showConfirmation = false;
  }
}
