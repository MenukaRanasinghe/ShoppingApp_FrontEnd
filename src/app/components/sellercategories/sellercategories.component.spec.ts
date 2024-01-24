import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellercategoriesComponent } from './sellercategories.component';

describe('SellercategoriesComponent', () => {
  let component: SellercategoriesComponent;
  let fixture: ComponentFixture<SellercategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellercategoriesComponent]
    });
    fixture = TestBed.createComponent(SellercategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
