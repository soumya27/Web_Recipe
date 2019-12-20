import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

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


  constructor(private fb: FormBuilder) {
  }

  createForm() {
    this.user = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  ngOnInit() {
  }


  /*
   * Method to verify the login credentials
   * and navigate user to next page
   */
  onUserLogin() {
  }
}
