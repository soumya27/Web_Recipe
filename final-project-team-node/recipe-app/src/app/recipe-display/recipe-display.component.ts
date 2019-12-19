import {Component, OnInit} from '@angular/core';
import {Recipe} from "../models/recipe.model";
import {RecipeService} from "../services/recipe.service";

@Component({
  selector: 'app-recipe-display',
  templateUrl: './recipe-display.component.html',
  styleUrls: ['./recipe-display.component.scss']
})
export class RecipeDisplayComponent implements OnInit {

  recipes: Array<Recipe>;

  constructor(private recipeService: RecipeService) { }

  /**
   *  Loading all the recipes
   */
  ngOnInit() {
    (<HTMLInputElement>document.getElementsByClassName("wrapper").item(0)).style.background = 'none';

    this.recipeService.getRecipes().subscribe(
      recipes => {
        this.recipes = recipes;
      },
      error =>{
        console.log("Failed to fetch recipes");
      }
    );
  }

  /**
   *  Updating the display with the search results emitted by the child
   *  @param $event event Object
   */
  updateResult($event){
    this.recipes.splice(0,this.recipes.length);
    this.recipes = $event;
  }
}
