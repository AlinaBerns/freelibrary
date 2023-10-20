import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users: any[] = [

    {
      id:1,
      username: 'cusernamettttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt',
      email: 'buser@gmail.com'
    },

    {
      id:2,
      username: 'busername',
      email: 'cuser@gmail.com'
    },

    {
      id:3,
      username: 'ausername',
      email: 'duser@gmail.comtttttttttttttttttttttttttttttttttttttttttttttttttttttt'
    },

    {
      id:4,
      username: 'ausername',
      email: 'duser@gmail.com'
    },

    {
      id:5,
      username: 'ausername',
      email: 'duser@gmail.com'
    },

    {
      id:6,
      username: 'ausername',
      email: 'duser@gmail.com'
    }

  ];

  sortDirection: string = 'asc';
  
  

  sortDataByUsername() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.users.sort((a, b) => {
      return this.sortDirection === 'asc' ? a.username.localeCompare(b.username) : b.username.localeCompare(a.username);
    });
  }

  sortDataByEmail() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.users.sort((a, b) => {
      return this.sortDirection === 'asc' ? a.email.localeCompare(b.email) : b.email.localeCompare(a.email);
    });
  }

  sortDataById() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.users.sort((a, b) => {
      const idA = a.id;
      const idB = b.id;
  
      if (this.sortDirection === 'asc') {
        return idA - idB;
      } else {
        return idB - idA;
      }
    });

}}
