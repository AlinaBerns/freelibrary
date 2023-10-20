import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAuthorDialogComponent } from './new-author-dialog.component';

describe('NewAuthorDialogComponent', () => {
  let component: NewAuthorDialogComponent;
  let fixture: ComponentFixture<NewAuthorDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewAuthorDialogComponent]
    });
    fixture = TestBed.createComponent(NewAuthorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
