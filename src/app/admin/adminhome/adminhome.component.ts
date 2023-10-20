import { Component } from '@angular/core';
import { BookService } from 'src/app/services/bookservice/book.service';
import { BookDialogComponent, BookData } from '../.././dialogs/book-dialog/book-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent {

constructor(private bookService: BookService, public dialog: MatDialog) { }

books:any[]=[];

sortDirection: string = 'asc';

ngOnInit(): void {
  this.getAllBooks();
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
    return this.sortDirection === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
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

}
