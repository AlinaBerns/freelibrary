import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private utils:UtilsService) { }

  login(inputusername: string, inputpassword: string) {
    // Create a request object
    const loginRequest = {
      username: inputusername,
      password: inputpassword
    };
    

    // Make a POST request to the login endpoint
    axios.post('http://localhost:8080/api/auth/signin', loginRequest,{
    })
      .then(response => {  // Handle the response
        console.log('Login successful:', response); 

        // Assuming the accessToken is returned in a property called 'accessToken' on the response data
        const accessToken = response.data.accessToken;
        const roles = response.data.roles;  // Extract roles from response data

        if (accessToken && roles) {
          // Save the accessToken and roles to local storage
          localStorage.setItem('authToken', accessToken);
          // Store roles as a JSON string -> to retrive it, use const roles = JSON.parse(localStorage.getItem('roles'))
          localStorage.setItem('roles', JSON.stringify(roles));  
          // Navigate to HomeComponent for users and AdminUsersComponent for admins
          switch (roles[0]) {
            case 'ROLE_USER':
              this.router.navigate(['']);
              break;
            case 'ROLE_ADMIN':
              this.router.navigate(['/adminhome']);
              break;
            default:
              console.error('Invalid role:', roles[0]);
          }
        } else {
          console.error('No accessToken received');
        }
      })
      .catch(error => {
        console.error('Login error:', error);
        alert('Login failed, check the console for details');
      });
  }


  register(inputusername: string, inputpassword: string, inputemail: string) {
    // Create a request object
    const signUpRequest = {
      username: inputusername,
      password: inputpassword,
      email: inputemail
    };

    // Make a POST request to the register endpoint
    axios.post('http://localhost:8080/api/auth/signup', signUpRequest, {
      headers: {
        'Content-Type': 'application/json' 
      }
    }).then(response => {  
      console.log('Registration successful:', response);

      alert('Registration successful, please login');

      this.router.navigate(['/login']);

    }).catch(error => {
      console.error('Registration error:', error);
      alert('Registration failed, check the console for details');
    });
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }


}
