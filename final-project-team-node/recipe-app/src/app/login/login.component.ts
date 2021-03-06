import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from "@angular/material/core";
import {Router} from "@angular/router";
import {changeBackground} from "../util/changeBackground";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private imageUrl = 'url("https://cdn.pixabay.com/photo/2016/02/19/11/30/shrimp-1209744_960_720.jpg")';

  user = new FormGroup({
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  });

  matcher = new MyErrorStateMatcher();

  constructor(private router: Router) {
  }

  ngOnInit() {
    changeBackground(this.imageUrl);
  }

  onRegister() {
    this.router.navigate(['register']);
  }

  /*
   * Method to verify the login credentials
   * and navigate user to next page
   */
  onUserLogin() {
  }

}
