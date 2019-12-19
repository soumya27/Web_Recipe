import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  contactPage(){
    this.router.navigate(['contactus']);
  }

  homePage(){
    this.router.navigate(['home']);
  }

  search(){
    this.router.navigate(['search']);
  }

}
