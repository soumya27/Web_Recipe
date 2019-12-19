import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from "../models/user.model";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class UserService {

  userResource: string;
  userResourceURL: string;

  constructor(private http: HttpClient){
    this.userResource = 'users';
    this.userResourceURL= `${environment.serverBaseURL}/${this.userResource}`;
  }

  /*
   * Fetch user by username
   */
  verifyUser(user: User): Observable<any>{
    debugger
    const findUser: string = this.userResourceURL+`/${user.username}`;
    return this.http.post<User>(findUser, user);
  }
  
  /*
   * Creating a new user
   */
  registerUser(user: User): Observable<User>{
    return this.http.post<User>(this.userResourceURL, user);
  }

  /**
   * Forgot password link
   */
  forgotPassword(user: User): Observable<User> { 
    console.log("Inside userService fp");
    console.log("User:",user);
    const mailUser: string = this.userResource+'/forget-password';
    // /users/forget-password'
    console.log(mailUser);
    return this.http.post<User>(mailUser, user);
  }
}
