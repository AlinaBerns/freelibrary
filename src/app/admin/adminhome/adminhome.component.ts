import { Component } from '@angular/core';
import { BookService } from 'src/app/services/bookservice/book.service';
import { Subscription, switchMap } from 'rxjs';
import { BookDialogComponent, BookData } from '../.././dialogs/book-dialog/book-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SearchService } from 'src/app/services/searchservice/search.service';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent {

constructor(private bookService: BookService, public dialog: MatDialog, private searchService: SearchService) { }

private searchSubscription: Subscription | undefined;

books:any[]=[];

sortDirection: string = 'asc';

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
      this.books = data;
      console.log('Books: ', this.books);
      
    },
    error: error => {
      console.error('There was an error!', error);
    }
  });
}

sortDataByTitle() {
  this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  this.books.sort((a, b) => {
    return this.sortDirection === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
  });
}

sortDataByYear() {
  this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  this.books.sort((a, b) => {
    return this.sortDirection === 'asc' ? a.year.localeCompare(b.year) : b.year.localeCompare(a.year);
  });
}
sortDataByAuthor() {
  this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  this.books.sort((a, b) => {
    return this.sortDirection === 'asc' ? a.author.name.localeCompare(b.author.name) : b.author.name.localeCompare(a.author.name);
  });
}

sortDataByIsbn() {
  this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  this.books.sort((a, b) => {
    return this.sortDirection === 'asc' ? a.isbn.localeCompare(b.isbn) : b.isbn.localeCompare(a.isbn);
  });
}
sortDataById() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.books.sort((a, b) => {
      const idA = a.id;
      const idB = b.id;
  
      if (this.sortDirection === 'asc') {
        return idA - idB;
      } else {
        return idB - idA;
      }
    });
}

 //Get all books
 getAllBooks() {
  this.bookService.getAllBooks().then(data => {
    this.books = data;
    console.log('Books: ', this.books);
  }).catch(error => {
    console.error('There was an error!', error);
  });
}


openDialog(book?: BookData): void {
  const dialogRef = this.dialog.open(BookDialogComponent, {
    width: '260px',
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

deleteBook(id: number) {
  this.bookService.deleteBook(id).then((resp) => {
    alert(resp.message);
    this.getAllBooks();
  });
}

ngOnDestroy() {
  if (this.searchSubscription) {
    this.searchSubscription.unsubscribe();
  }
}

}
