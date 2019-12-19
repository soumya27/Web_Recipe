import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RecipeService } from '../services/recipe.service';
import {Recipe} from "../models/recipe.model";
import {Ingredients} from "../models/ingredient.model";
import {Steps} from "../models/steps.model";
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss']
})
export class NewRecipeComponent implements OnInit {

  private recipe: Recipe;

  private ingredientsList: Array<Ingredients> = [new Ingredients("","")];
  private stepsList: Array<Steps> = [new Steps("")];

  // Using category list to build the display
  categories = ["Asian", "BBQ", "Beverages",
    "Breakfast", "Dessert", "Fast Food", "Healthy",
    "Indian", "Italian", "Mexican"];

  constructor(public recipeService: RecipeService,
              private router: Router,
              private data: DataService) {
  }

  ngOnInit() {
    this.data.currentRecipe.subscribe((data: Recipe) => {
      this.recipe = data;
    });
  }


  addIngredient(){
    this.ingredientsList.push(new Ingredients("",""));
  }

  addSteps(){
    this.stepsList.push(new Steps(""));
  }

  // Routing to recipe-details page once recipe is successfully created
  recipeDetails() {
    this.router.navigate(['recipe-details']);
  }

}
