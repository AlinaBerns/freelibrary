import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }


  getTokenFromLocalStorage(): string {
    return localStorage.getItem('authToken') || '';
  }

  deCodeToken(token: string): any {
    return jwt_decode(token);
  }

  getDecodedToken(): any {
    return this.deCodeToken(this.getTokenFromLocalStorage());
  }

  getConfig(): any{
    return {headers: {
      Authorization: `Bearer ${this.getTokenFromLocalStorage()}`
    }
  };
  }

  getUserRole(): string {
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');
    return roles[0]; // Assuming the roles are stored as an array of strings
  }

}
