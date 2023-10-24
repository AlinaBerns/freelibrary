import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Aboutus3Component } from './aboutus3.component';

describe('Aboutus3Component', () => {
  let component: Aboutus3Component;
  let fixture: ComponentFixture<Aboutus3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Aboutus3Component]
    });
    fixture = TestBed.createComponent(Aboutus3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
