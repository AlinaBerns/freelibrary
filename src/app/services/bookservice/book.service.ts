import { Injectable } from '@angular/core';
import { UtilsService } from '../security/utils.service';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private util : UtilsService) { }

  async getAllBooks(): Promise<any> {
    const url = 'http://localhost:8080/api/book/getbooks';
    
    try {
      if (!this.util.getTokenFromLocalStorage()) {
       return Promise.reject('No token found');
      }
            
      console.log(this.util.getTokenFromLocalStorage); // For debugging purposes only
      console.log(this.util.getConfig()); // For debugging purposes only
      
      //Make a GET request to the parameterized url
      return axios.get(url, this.util.getConfig()).then(response => response.data);
      
    } catch (error) {
       return Promise.reject(error);
    }

   }

   async searchBooks(query: string): Promise<any> {
    const url = 'http://localhost:8080/api/book';
    const parameterizedUrl = `${url}/search?query=${query}`;
  
    try {
      const response = await axios.get(parameterizedUrl, this.util.getConfig());
      return response.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }

  addBook(book: any): Promise<any> {
    return axios.post('http://localhost:8080/api/book/add', book, this.util.getConfig()).then(resp => resp.data);
  }

  updateBook(book: any): Promise<any> {
    return axios.put('http://localhost:8080/api/book/update', book, this.util.getConfig()).then(resp => console.log(resp.data));
  }

  deleteBook(id: number): Promise<any> {

    console.log('Delete book with id: ', id);
    
    return axios.delete(`http://localhost:8080/api/book/delete?bookId=${id}`, this.util.getConfig())
    .catch(error => {
      console.error(error);
      return Promise.reject(error);
    });
    
  }

  returnBooks(bookIds: number[]): Promise<any> {
    return axios.put('http://localhost:8080/api/book/return', bookIds, this.util.getConfig()).then(resp => console.log(resp.data));
  }

}
