import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutsellerComponent } from './layoutseller.component';

describe('LayoutsellerComponent', () => {
  let component: LayoutsellerComponent;
  let fixture: ComponentFixture<LayoutsellerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutsellerComponent]
    });
    fixture = TestBed.createComponent(LayoutsellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
