import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-navbaruser',
  templateUrl: './navbaruser.component.html',
  styleUrls: ['./navbaruser.component.scss']
})
export class NavbaruserComponent {
  selectedTab: string = ''; 
  showLogoutButton: boolean = false;
  showConfirmation: boolean = false;

  constructor(private router: Router,private cdr: ChangeDetectorRef,private zone: NgZone) {}

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

  toggleLogoutButton(): void {
    this.showLogoutButton = !this.showLogoutButton;
  }

  toggleConfirmation(): void {
    this.zone.run(() => {
      this.showConfirmation = !this.showConfirmation;
    });
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
  editProfile(): void {
    console.log('Edit Profile clicked!');
    this.router.navigate(['/user']);
  }
}
