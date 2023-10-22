import { Component } from '@angular/core';
import { BookService } from 'src/app/services/bookservice/book.service';
import { Subscription, switchMap } from 'rxjs';
import { BookDialogComponent, BookData } from '../.././dialogs/book-dialog/book-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SearchService } from 'src/app/services/searchservice/search.service';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from 'src/app/dialogs/tabbed-dialog/tabbed-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from 'src/app/dialogs/custom-snackbar/custom-snackbar.component';


@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements AfterViewInit{


constructor(private bookService: BookService, public dialog: MatDialog, private searchService: SearchService, private snackBar: MatSnackBar) { }

private searchSubscription: Subscription | undefined;

displayedColumns: string[] = ['id', 'image', 'title', 'author', 'isbn',  'status', 'edit'];


books = new MatTableDataSource<Book>([]);

sortDirection: string = 'asc';

@ViewChild(MatSort, {static: true}) sort!: MatSort | undefined;


ngAfterViewInit() {
  
  if (this.sort) {
    this.books.sort = this.sort;
    
    console.log(this.sort);
    console.log(this.books);
    
  }
}

ngOnInit(): void {

  this.getAllBooks();

  this.searchSubscription = this.searchService.searchObservable.pipe(
    switchMap(query => {
      if (query !== null) {
        return this.bookService.searchBooks(query);
      } else {
        return [];
      }
    })
  ).subscribe({
    next: data => {
      this.books.data = data;
      console.log('Books: ', this.books);
      
    },
    error: error => {
      console.error('There was an error!', error);
    }
  });
}



 //Get all books
 getAllBooks() {
  this.bookService.getAllBooks().then(data => {
    this.books.data = data;
    console.log('Books: ', this.books.data);
  }).catch(error => {
    console.error('There was an error!', error);
  });
}


openDialog(book?: BookData): void {
  const dialogRef = this.dialog.open(BookDialogComponent, {
    width: '500px', height: '600px',
    data: book || {}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed', result);
    if (result) {
      if (book && book.id > 0) {
        this.bookService.updateBook(result).then(updatedBook => {
          console.log('Updated book: ', updatedBook);
          this.getAllBooks();
        });
      } else {
        this.bookService.addBook(result).then(addedBook => {
          console.log('Added book: ', addedBook);
          this.getAllBooks();
        });
      }
    }
  });
}

deleteBookBar(bookId: number) {
  const snackBarRef = this.snackBar.openFromComponent(CustomSnackbarComponent, {
    data: {
      action: () => {
        // Your delete action here, for example:
        this.deleteBook(bookId);
      },
    },
  });

  // Optionally, you can also handle the action of dismissing the snackbar without confirmation:
  snackBarRef.afterDismissed().subscribe(info => {
    if (!info.dismissedByAction) {
      // The snackbar was dismissed without confirmation
    }
  });
}


deleteBook(id: number) {
  this.bookService.deleteBook(id).then((resp) => {
    const snackBarRef = this.snackBar.open('Book deleted successfully!', 'ok', {
      duration: 3000
    });
    this.getAllBooks();
  });
}

ngOnDestroy() {
  if (this.searchSubscription) {
    this.searchSubscription.unsubscribe();
  }
}

}
