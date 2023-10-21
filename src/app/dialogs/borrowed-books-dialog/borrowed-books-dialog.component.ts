import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface User {
  id: number;
  username: string;
  email: string;
  // ... other user properties ...
}

export interface Book {
  id: number;
  title: string;
  status: string;
}

export interface BorrowedBook {
  user: User;
  book: Book;
  dateOfIssue: Date;
  dateOfReturn: Date;
  isActive: boolean;
}

export interface BorrowedBooksDialogData {
  borrowedBooks: BorrowedBook[];
}

export interface BorrowedBooksDialogResult {
  selectedBooks: Book[];
}


@Component({
  selector: 'app-borrowed-books-dialog',
  templateUrl: './borrowed-books-dialog.component.html',
})
export class BorrowedBooksDialogComponent {
  selectedBooks: Book[] = [];

  constructor(
    public dialogRef: MatDialogRef<BorrowedBooksDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BorrowedBooksDialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    this.dialogRef.close({ selectedBooks: this.selectedBooks });
  }

  toggleSelection(book: Book): void {
    const index = this.selectedBooks.indexOf(book);
    if (index > -1) {
      this.selectedBooks.splice(index, 1);
    } else {
      this.selectedBooks.push(book);
    }
  }
}
