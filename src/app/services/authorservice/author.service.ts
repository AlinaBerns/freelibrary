import { Injectable } from '@angular/core';
import { UtilsService } from '../security/utils.service';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private utils: UtilsService) { }

  addAuthor(author: any): Promise<any> {
    return axios.post('http://localhost:8080/api/author/add', author, this.utils.getConfig()).then(resp => resp.data);
  }


  getAllAuthors(): Promise<any> {
    return axios.get('http://localhost:8080/api/author/getall', this.utils.getConfig()).then(resp => resp.data);
  }

}
