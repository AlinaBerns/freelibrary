import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDescriptionDialogComponent } from './book-description-dialog.component';

describe('BookDescriptionDialogComponent', () => {
  let component: BookDescriptionDialogComponent;
  let fixture: ComponentFixture<BookDescriptionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookDescriptionDialogComponent]
    });
    fixture = TestBed.createComponent(BookDescriptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
