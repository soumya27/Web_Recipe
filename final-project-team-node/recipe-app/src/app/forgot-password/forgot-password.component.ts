import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgot = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private fb: FormBuilder ) {
    this.createForm();
  }

  createForm() {
    this.forgot = this.fb.group({
       username: ['', Validators.required ],
       password: ['', Validators.required ],
       token: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onPasswordReset() {
    console.log("inside password reset");
    console.log(this.forgot.value);
  }

}
