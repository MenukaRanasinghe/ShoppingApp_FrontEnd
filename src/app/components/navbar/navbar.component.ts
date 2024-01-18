import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  selectedTab: string = 'active';

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }
}
