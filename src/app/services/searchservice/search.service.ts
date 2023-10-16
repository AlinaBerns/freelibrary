import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  private searchSubject = new BehaviorSubject<string>('');

  searchObservable = this.searchSubject.asObservable();

  updateSearchTerm(term: string) {
    this.searchSubject.next(term);
  }
}
