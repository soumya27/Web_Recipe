import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/auth.service';
import { JwtService } from '../services/jwt.service';
import { DataService } from "../services/data.service";
import { stringify } from 'querystring';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';


  constructor(
    private fb: FormBuilder,
    private router: Router,
    public userService: UserService,
    public route: ActivatedRoute,
    public data: DataService,
    private authenticationService: AuthenticationService,
    private jwtService: JwtService) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  createForm() {
    this.user = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  username: string;
  password: string;

  ngOnInit() {
    this.createForm();

    this.getName();
    this.getPass();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }



  // convenience getter for easy access to form fields
  get f() { return this.user.controls; }


  getName() {
    this.username = this.jwtService.getItemName("username");
  }

  getPass() {
    this.password = this.jwtService.getItemPass("password");
  }

  /*
   * Method to verify the login credentials
   * and navigate user to next page
   */
  onUserLogin() {
    this.onRememberMe();
    this.submitted = true;
    this.userService.verifyUser(this.user.value)
      .subscribe(data => {
        // debugger
        console.log(data.token);
        this.jwtService.saveInLocal("token", data.token);
        this.jwtService.saveInLocal("firstname", data.user.firstname);
        console.log(this.jwtService.getFromLocal("firstname"));
        this.username = this.user.value.username;
        this.password = this.user.value.password;
        console.log(data.user.username);
        // this.router.navigate(['']);
        if (typeof data !== undefined) {
          if (data.user.username === this.user.value.username) {
            console.log(this.jwtService.getFromLocal("token"));
            console.log("login successful");
            this.data.setLoginState(true);
            this.router.navigate(['home']);
          } else {
            console.log("login failed");
            (<HTMLElement><any>document.getElementsByClassName('error-message'))[0].style.display = "block";
          }
        } else {
          (<HTMLElement><any>document.getElementsByClassName('error-message'))[0].style.display = "block";
        }
      },
        error => {
          console.log("Something went wrong");
          console.log(error);
        });
  }

  /*
   * To navigate user to the registration page
   */
  openRegister() {
    this.router.navigate(['register']);
  }

  onRememberMe() {
    debugger
    if ((<HTMLInputElement>document.getElementById('checkBox')).checked) {
      console.log("Checked");
      this.jwtService.saveInLocal("username", this.user.value.username);
      this.jwtService.saveInLocal("password", this.user.value.password);
    } else {
      console.log("Unchecked");
      this.jwtService.deleteRememberMeStorage();
    }
  }

  handleForgotPass() {
    console.log("Inside forgot password");
    this.userService.forgotPassword(this.user.value);
    this.forgot();
  }

  forgot() {
    console.log("Inside ");
    this.router.navigate(['/forgot-password']);
  }
}
