import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercollectionComponent } from './usercollection.component';

describe('UsercollectionComponent', () => {
  let component: UsercollectionComponent;
  let fixture: ComponentFixture<UsercollectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsercollectionComponent]
    });
    fixture = TestBed.createComponent(UsercollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
