import { Component, OnInit } from '@angular/core';
import { JwtService } from '../services/jwt.service';
import { Router } from '@angular/router';
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  name: string = "User";
  state: string = "Login";

  constructor(private router: Router, private jwtService: JwtService,private data: DataService) { }

  ngOnInit() {
    this.data.isLoggedIn.subscribe((state : boolean) => {
      if(state){
        this.name = this.jwtService.getFromLocal("firstname");
        this.state = "Logout";
      }else {
        this.name = "";
        this.state = "Login";
      }
    });
  }

  onLogout(){
    if(this.state === "Logout") {
      this.name = "";
      this.state = "Login";
      this.jwtService.deleteStorage();
      this.router.navigate(['']);
    } else {
      this.router.navigate(['login']);
    }
  }

  onAdd(){
    this.router.navigate(['new-recipe']);
  }

  onSearch(){
    this.router.navigate(['']);
  }

  onAboutUs(){
    this.router.navigate(['contactus']);
  }

  onUserProfile(){
    this.router.navigate(['profile']);
  }
}
