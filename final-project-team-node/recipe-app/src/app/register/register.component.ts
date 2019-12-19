import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  user: User;

  constructor(private fb: FormBuilder, private router: Router, public userService: UserService, public route: ActivatedRoute) {
    // this.createForm();
  }

  ngOnInit() {
    this.newForm();
  }

  /*
   * Method to register new user
   * todo : 1. not able to fetch the gender value
   *        2. display error to user
   */
  onUserRegister() {
    if (this.registerForm.valid) {
      this.user = this.registerForm.value;
      this.user.name = this.registerForm.controls.firstname.value + " " + this.registerForm.controls.lastname.value;
      this.userService.registerUser(this.user).subscribe(data => {
        alert('created');
        this.router.navigate(['login']);
      }, error => {
        console.log("Failed to register");
      });
    }
    else{
      this.validateAllFormFields(this.registerForm);
    }

  }

  /*
   * Navigating the user to login page
   */
  openLogin() {
    this.router.navigate(['login']);
  }

  newForm() {
    this.registerForm = new FormGroup({
      firstname: new FormControl("", Validators.compose([Validators.required])),
      lastname: new FormControl("", Validators.compose([Validators.required])),
      username: new FormControl("", Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
      password: new FormControl("", Validators.compose([Validators.required, Validators.minLength(6)])),
      gender: new FormControl(""),
    });
  }

  validateAllFormFields(formGroup: FormGroup) {
    //{1}
    Object.keys(formGroup.controls).forEach(field => {
      //{2}
      const control = formGroup.get(field); //{3}
      if (control instanceof FormControl) {
        //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        //{5}
        this.validateAllFormFields(control); //{6}
      }
    });
  }

}
