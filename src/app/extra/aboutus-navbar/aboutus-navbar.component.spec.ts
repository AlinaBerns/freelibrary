import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutusNavbarComponent } from './aboutus-navbar.component';

describe('AboutusNavbarComponent', () => {
  let component: AboutusNavbarComponent;
  let fixture: ComponentFixture<AboutusNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutusNavbarComponent]
    });
    fixture = TestBed.createComponent(AboutusNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
