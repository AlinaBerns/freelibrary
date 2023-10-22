import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthorService } from 'src/app/services/authorservice/author.service';
import { NewAuthorDialogComponent } from '../newauthor-dialog/new-author-dialog/new-author-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface BookData {
  id: number;
  title: string;
  genre: string;
  author: Author;
  status: string;
  isbn: string;
}

export interface Author {
  id?: number; // If the id is generated and available, you can include it here
  name: string;
}

@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
})
export class BookDialogComponent{

  authors: Author[] = [];

  data: BookData = { id: 0, title: '', genre: '', author: { name: '' }, isbn: '', status };  // Initialize data property

  newAuthor: Author = { name: 'Add new author'};

  statuses: string[] = ['AVAILABLE', 'NOT_AVAILABLE'];

  bookForm: FormGroup = this.fb.group({});

  constructor(
    public dialogRef: MatDialogRef<BookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public incomingData: BookData,
    private authorService: AuthorService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    if (incomingData) {
      this.data = {...incomingData, author: {...incomingData.author}};  // Copy incoming data to local data property if present
    }
  }

  ngOnInit(): void {
      // Fetch authors on component init
      this.authorService.getAllAuthors().then(data => {
        this.authors = data;
        console.log('Authors: ', this.authors);
      });

      // Initialize form
      this.bookForm = this.fb.group({
        id: [this.data.id || 0],
        title: [this.data.title || '', Validators.required],
        genre: [this.data.genre || '', Validators.required],
        author: [this.data.author || '', Validators.required],
        status: [this.data.status || '', Validators.required],
        isbn: [this.data.isbn || '', [Validators.required, Validators.pattern(/^\d{13}$/)]]
    });

  }

  onNoClick(): void {  // Define onNoClick method
    this.dialogRef.close();
  }


  openNewAuthorDialog(): void {
    const dialogRef = this.dialog.open(NewAuthorDialogComponent, {
      width: '260px'
    });
  
    dialogRef.afterClosed().subscribe(result => {

      console.log('result: ', result);
      
      if (result) {
        this.authorService.addAuthor(result).then(newAuthor => {
          this.authors.push(newAuthor);  // Update the authors list with the new author
          this.data.author = newAuthor;  // Set the new author as the selected author
        });
      }
    });
  }
}

