import { Component, OnInit } from '@angular/core';
import { changeBackground } from "../util/changeBackground";

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {

  constructor() { }

  private imageUrl = 'url("../../assets/images/contactus.jpg")';

  ngOnInit() {
    changeBackground(this.imageUrl);
  }

}
