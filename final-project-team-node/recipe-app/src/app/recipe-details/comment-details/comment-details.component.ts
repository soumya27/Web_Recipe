import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../models/recipe.model";

@Component({
  selector: 'app-comment-details',
  templateUrl: './comment-details.component.html',
  styleUrls: ['./comment-details.component.scss']
})
export class CommentDetailsComponent implements OnInit {

  constructor() { }

  @Input() recipe: Recipe;
  ngOnInit() {
  }

}
