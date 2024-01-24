import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellercollectionComponent } from './sellercollection.component';

describe('SellercollectionComponent', () => {
  let component: SellercollectionComponent;
  let fixture: ComponentFixture<SellercollectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellercollectionComponent]
    });
    fixture = TestBed.createComponent(SellercollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
