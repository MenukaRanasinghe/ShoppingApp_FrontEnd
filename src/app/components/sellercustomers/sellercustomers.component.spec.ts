import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellercustomersComponent } from './sellercustomers.component';

describe('SellercustomersComponent', () => {
  let component: SellercustomersComponent;
  let fixture: ComponentFixture<SellercustomersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellercustomersComponent]
    });
    fixture = TestBed.createComponent(SellercustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
