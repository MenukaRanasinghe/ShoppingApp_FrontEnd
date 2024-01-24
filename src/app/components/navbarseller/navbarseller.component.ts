import { Component } from '@angular/core';

@Component({
  selector: 'app-navbarseller',
  templateUrl: './navbarseller.component.html',
  styleUrls: ['./navbarseller.component.scss']
})
export class NavbarsellerComponent {
  selectedTab: string = 'active';

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }
}
