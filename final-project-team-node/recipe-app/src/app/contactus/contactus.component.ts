import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {

  constructor() { }

  private imageUrl = 'url("../../assets/images/contactus.jpg")';

  updateWrapperBg(){
    (<HTMLInputElement>document.getElementsByClassName("wrapper").item(0)).style.background = this.imageUrl ;
    (<HTMLInputElement>document.getElementsByClassName("wrapper").item(0)).style.backgroundRepeat = 'no-repeat';
    (<HTMLInputElement>document.getElementsByClassName("wrapper").item(0)).style.backgroundSize = 'cover';
  }

  ngOnInit() {
    this.updateWrapperBg();
  }

}
