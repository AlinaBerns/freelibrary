import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbaradminComponent } from './navbaradmin.component';

describe('NavbaradminComponent', () => {
  let component: NavbaradminComponent;
  let fixture: ComponentFixture<NavbaradminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbaradminComponent]
    });
    fixture = TestBed.createComponent(NavbaradminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
