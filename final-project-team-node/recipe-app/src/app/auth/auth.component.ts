import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  isLoginMode = true;

  onSwitchMode(){
    console.log("inside switch mode!");
    this.isLoginMode = !this.isLoginMode;
  }
}
