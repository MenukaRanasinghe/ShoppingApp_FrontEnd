import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbarseller',
  templateUrl: './navbarseller.component.html',
  styleUrls: ['./navbarseller.component.scss']
})
export class NavbarsellerComponent {
  selectedTab: string = ''; 
  showLogoutButton: boolean = false;
  showConfirmation: boolean = false;

  constructor(private router: Router,private cdr: ChangeDetectorRef) {}

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

  toggleLogoutButton(): void {
    this.showLogoutButton = !this.showLogoutButton;
  }

  toggleConfirmation(): void {
    this.showConfirmation = !this.showConfirmation;
  }
   

  confirmLogout(): void {
    console.log('Logout confirmed!');
  
    this.router.navigate(['/login']);
  
    this.showConfirmation = false; 
    this.showLogoutButton = false;
  }
  

  cancelConfirmation(): void {
    this.showConfirmation = false;
  }
}
