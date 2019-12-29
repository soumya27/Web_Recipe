import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { JwtService } from '../services/jwt.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  // loading = false;
  users: User[];

  constructor(private router : Router, private userService: UserService, private jwtservice: JwtService) { }

  // this.users has error
  ngOnInit() {
    // this.jwtservice.getLocalStorage();
    // this.loading = true;
    //   this.userService.getAll().pipe(first()).subscribe(users => {
    //     console.log(users)
    //     this.loading = false;
    //     // this.users = users;
    // });
  }

  isLoginMode = false;

  onSwitchMode(){

    this.isLoginMode = !this.isLoginMode;
  }

  /**
   * Method to route to create recipe page if user logged in
   * else to the login page
   */
  CreateRecipe(){
    console.log(this.jwtservice.getFromLocal("token"));
    if(this.jwtservice.getFromLocal("token") !== null){
      this.onSwitchMode();
    }else{
      this.isLoginMode = false;
    }
    // pending - check if user is logged in or not logged in using firebase authService
    if(this.isLoginMode){
      this.router.navigate(['new-recipe']);
    }else{
      this.router.navigate(['login']);
    }
  }

  /**
   * Method to route to search page
   */
  SearchRecipe(){
    this.router.navigate(['search']);
  }
}
