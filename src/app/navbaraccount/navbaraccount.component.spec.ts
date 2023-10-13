import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbaraccountComponent } from './navbaraccount.component';

describe('NavbaraccountComponent', () => {
  let component: NavbaraccountComponent;
  let fixture: ComponentFixture<NavbaraccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbaraccountComponent]
    });
    fixture = TestBed.createComponent(NavbaraccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
