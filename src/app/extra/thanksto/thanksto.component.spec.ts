import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankstoComponent } from './thanksto.component';

describe('ThankstoComponent', () => {
  let component: ThankstoComponent;
  let fixture: ComponentFixture<ThankstoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThankstoComponent]
    });
    fixture = TestBed.createComponent(ThankstoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
