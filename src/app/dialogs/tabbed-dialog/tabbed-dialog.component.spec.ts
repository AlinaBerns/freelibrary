import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabbedDialogComponent } from './tabbed-dialog.component';

describe('TabbedDialogComponent', () => {
  let component: TabbedDialogComponent;
  let fixture: ComponentFixture<TabbedDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabbedDialogComponent]
    });
    fixture = TestBed.createComponent(TabbedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
