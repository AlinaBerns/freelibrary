import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowedBooksDialogComponent } from './borrowed-books-dialog.component';

describe('BorrowedBooksDialogComponent', () => {
  let component: BorrowedBooksDialogComponent;
  let fixture: ComponentFixture<BorrowedBooksDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BorrowedBooksDialogComponent]
    });
    fixture = TestBed.createComponent(BorrowedBooksDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
