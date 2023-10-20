import { Component } from '@angular/core';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent {
books:any[]=[
  {id: 1, 
    title: 'ATEST', 
    author:'Aauthor', 
    isbn:'9132345678954',
    year: '1913',
    
  },
  {id: 2, 
    title: 'PTEST', 
    author:'Dauthor', 
    isbn:'9132345678955',
    year: '1913',
    
  },
  {id: 3, 
    title: 'OTEST', 
    author:'Aauthor', 
    isbn:'9132345678956',
    year: '1912',
    
  },
  {id: 4, 
    title: 'RTEST', 
    author:'Dauthor', 
    isbn:'9132345678957',
    year: '1911',
    
  }
];

sortDirection: string = 'asc';

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
    return this.sortDirection === 'asc' ? a.author.localeCompare(b.author) : b.author.localeCompare(a.author);
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
}
