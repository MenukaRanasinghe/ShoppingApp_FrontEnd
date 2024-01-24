import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerordersComponent } from './sellerorders.component';

describe('SellerordersComponent', () => {
  let component: SellerordersComponent;
  let fixture: ComponentFixture<SellerordersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellerordersComponent]
    });
    fixture = TestBed.createComponent(SellerordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
