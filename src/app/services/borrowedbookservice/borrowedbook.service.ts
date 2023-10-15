import { Injectable } from '@angular/core';
import { UtilsService } from '../security/utils.service';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class BorrowedbookService {

  constructor(private util:UtilsService) { }

  async getActiveBorrowedBooks(): Promise<any> {

    const url = 'http://localhost:8080/api/borrow/getall';
    
    try {
      if (!this.util.getTokenFromLocalStorage()) {
       return Promise.reject('No token found');
      }

      //Get username from decoded token ("sub" in token)
      const id = this.util.getDecodedToken().id;

      console.log('username: ', id);
      

      //Make a parameterized url
      const parameterizedUrl = url + '?id=' + id;
      
      console.log(this.util.getTokenFromLocalStorage()); // For debugging purposes only
      console.log(this.util.getConfig()); // For debugging purposes only
      
      //Make a GET request to the parameterized url
      return axios.get(parameterizedUrl, this.util.getConfig()).then(response => response.data);
      
      
    } catch (error) {
       return Promise.reject(error);
    }
  }
}
