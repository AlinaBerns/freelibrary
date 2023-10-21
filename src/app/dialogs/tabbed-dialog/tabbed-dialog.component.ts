import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BorrowedbookService } from 'src/app/services/borrowedbookservice/borrowedbook.service';

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

export interface TabbedDialogData {
  userId: number;
  borrowedBooks: BorrowedBook[];
  reservedBooks: BorrowedBook[];
}

export interface TabbedDialogResult {
  selectedBooks: Book[];
}

@Component({
  selector: 'app-tabbed-dialog',
  templateUrl: './tabbed-dialog.component.html',
})
export class TabbedDialogComponent {
  selectedBorrowedBooks: Book[] = [];
  selectedReservedBooks: Book[] = [];

  constructor(
    public dialogRef: MatDialogRef<TabbedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TabbedDialogData,
    private borrowedBookService: BorrowedbookService,
  ) {
   
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  toggleSelection(book: Book, isBorrowed: boolean): void {
    const selectedBooks = isBorrowed ? this.selectedBorrowedBooks : this.selectedReservedBooks;
    const index = selectedBooks.indexOf(book);
    if (index > -1) {
      selectedBooks.splice(index, 1);
    } else {
      selectedBooks.push(book);
    }
  }

  issueBooks(): void {
    const selectedReservedBooksIds = this.selectedReservedBooks.map(book => book.id);

    this.borrowedBookService.issueBooks(this.data.userId, selectedReservedBooksIds);

    console.log('books to issue' + this.selectedReservedBooks);
    
    this.dialogRef.close({ action: 'issue', alert: 'Books issued successfully'});
  }

  returnBooks(isBorrowed: boolean): void {
    // Determine which set of books to return based on the tab
    const booksToReturn = isBorrowed ? this.selectedBorrowedBooks : this.selectedReservedBooks;

    const booksToReturnIds = booksToReturn.map(book => book.id);

    console.log('books to return' + booksToReturn.toString());
    
    
    // Logic to return booksToReturn

    this.borrowedBookService.returnBooks(this.data.userId,booksToReturnIds);

    alert('Books returned successfully');
    
    this.dialogRef.close({ action: 'return'});
     
  }


}
