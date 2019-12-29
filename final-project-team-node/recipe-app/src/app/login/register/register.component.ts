import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {changeBackground} from "../../util/changeBackground";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private imageUrl = 'url("https://cdn.pixabay.com/photo/2016/02/19/11/30/shrimp-1209744_960_720.jpg")';

  constructor(private router: Router) {
  }

  ngOnInit() {
    changeBackground(this.imageUrl);
  }

  /*
   * Navigating the user to login page
   */
  openLogin() {
    this.router.navigate(['login']);
  }
}
