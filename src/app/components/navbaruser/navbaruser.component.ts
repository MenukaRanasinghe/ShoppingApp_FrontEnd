import { Component } from '@angular/core';

@Component({
  selector: 'app-navbaruser',
  templateUrl: './navbaruser.component.html',
  styleUrls: ['./navbaruser.component.scss']
})
export class NavbaruserComponent {
  selectedTab: string = 'active';

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }
}
