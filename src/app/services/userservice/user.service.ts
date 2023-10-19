import { Injectable } from '@angular/core';
import { UtilsService } from '../security/utils.service';
import axios from 'axios';
import { AuthService } from '../security/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  getUserInfo(): Promise<any> {

    return axios.get('http://localhost:8080/api/users/get/id?id=' + this.util.getDecodedToken().id, this.util.getConfig())
    
    .then(response => {
      // check for data in the response
      if (response.data) {

        const user = {
          id: response.data.id,
          username: response.data.username,
          email: response.data.email
        }
        return user;
      } else {
        // handle or throw an error if there's no data
        throw new Error('No data returned');
      }
    })
    .catch(error => {
      console.error('Error getting user info:', error);
      throw error;  // re-throw the error after logging it
    });
  
  }

  constructor(private util : UtilsService, private authService:AuthService) { }

  async checkPassword(password: string): Promise<boolean> {
    // Make a GET request to the check password endpoint

    const userId = this.util.getDecodedToken().id;

    const response = await axios.get('http://localhost:8080/api/users/checkpassword?id=' + userId + '&password=' + password, this.util.getConfig()).then(response => response.data);

    return response;
  }


  updateUserInfo(user:any): void {
    // Make a PUT request to the update user info endpoint

    const userId = this.util.getDecodedToken().id;

    user.id = userId;

    console.log(user.username);
    

    const response = axios.post('http://localhost:8080/api/users/update', user ,this.util.getConfig()).then(response => response.data);

    console.log(response);

    alert("User info updated successfully, you will be redirected to the login page");
    
     this.authService.logOut();
  }

  deleteUser(): void { // for user, based on token
 
  // axios.delete('/api/users/delete?id=' + this.getDecodedToken().id, this.getConfig()).then(response => response.data);

  
  const confirmDeletion = confirm("Are you sure you want to delete your account?");
  
  if(confirmDeletion){
    
  axios.delete('http://localhost:8080/api/users/delete?id=' + this.util.getDecodedToken().id, this.util.getConfig()).then(response => response.data);

  alert("We are sad to see you leave :(, you will be redirected to the login page");

  this.authService.logOut();
  }
  }

  
}
