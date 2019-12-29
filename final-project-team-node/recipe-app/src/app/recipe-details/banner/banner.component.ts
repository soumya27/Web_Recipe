import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../models/recipe.model";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  constructor() { }

  @Input() recipe: Recipe;
  ngOnInit() {
  }

}
