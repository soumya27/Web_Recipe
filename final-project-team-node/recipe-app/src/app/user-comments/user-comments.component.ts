import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../models/recipe.model';
import {Comments} from '../models/comment.model';
import { DataService } from '../services/data.service';
// import { NgbRating } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-comments',
  templateUrl: './user-comments.component.html',
  styleUrls: ['./user-comments.component.scss']
})
export class UserCommentsComponent implements OnInit {

  private recipe: Recipe;

  constructor(public recipeService: RecipeService, private data: DataService) { }

  ngOnInit() {
    this.data.currentRecipe.subscribe((data : Recipe) => {
      this.recipe = data;
      console.log(data);
    });
  }

  onComment(form: NgForm, rating) {
    debugger
    if (form.valid) {
      console.log("Inside Valid");
      console.log(this.recipe.userComments);
      let userName = form.value.userName,
      emailId = form.value.userEmailId,
      comments = form.value.comments;
      let array = [];
      const userComment: Comments = {id: null, name: userName, emailAddress: emailId, comment: comments, rating: rating};
      for (let index in this.recipe.userComments) {
        array.push(this.recipe.userComments[index]);
      }
      array.push(userComment);
      console.log(array);
      this.recipe.userComments = array;

      this.recipeService.updateRecipe(this.recipe).subscribe (
        data => {
          this.recipeService.getRecipeById(data.id).subscribe (
            data => {
              console.log(data);
            },
            error => {
              console.log(error);
            }
          );
        },
        error => {
          console.log(error)
        });
    }
    else {
      console.log("Inside Not valid");
      alert("Missing fields to be filled");
    }
    document.getElementsByClassName('rating')[1].setAttribute("area-valuetext", "0 out of 10");
    form.resetForm();
  }
}
