import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import {Comments} from '../../models/comment.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-user-comments',
  templateUrl: './user-comments.component.html',
  styleUrls: ['./user-comments.component.scss']
})
export class UserCommentsComponent implements OnInit {

  private recipe: Recipe;
  private currentRate = 0;
  constructor(public recipeService: RecipeService, private data: DataService) { }

  ngOnInit() {
    this.data.currentRecipe.subscribe((data : Recipe) => {
      this.recipe = data;
      console.log(data);
    });
  }

  onComment(form: NgForm, rating) {
    let userName = (<HTMLInputElement>document.getElementById('username')).value;
    let emailId = (<HTMLInputElement>document.getElementById('email')).value;
    let comment =(<HTMLInputElement>document.getElementById('comment')).value;
    let newComment = new Comments(userName, emailId, comment, rating);
    this.recipe.userComments.push(newComment);
    this.recipeService.updateRecipe(this.recipe).subscribe (data => {
        this.recipeService.getRecipeById(data.id).subscribe (data => {
            console.log(data);
          }, error => {
            console.log(error);
        });
      },error => {
        console.log(error)
    });
  }
}
