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

  saveRecipe(){
    //todo make this efficient
    let recipeAttributes = ["recipeTitle", "recipeCategory", "recipeserving",
      "recipeCalories", "recipeTime", "recipeImage"];
    let newRecipe: Recipe;
    let listIngredients: Array<Ingredients> = [];
    let listSteps: Array<Steps>= [];
    let title = (<HTMLInputElement>document.getElementById(recipeAttributes[0])).value;
    let category =(<HTMLInputElement>document.getElementById(recipeAttributes[1])).value;
    let serving = (<HTMLInputElement>document.getElementById(recipeAttributes[2])).value;
    let calories = (<HTMLInputElement>document.getElementById(recipeAttributes[3])).value;
    let time = (<HTMLInputElement>document.getElementById(recipeAttributes[4])).value;
    let image = (<HTMLInputElement>document.getElementById(recipeAttributes[5])).value;

    let ingredients = document.getElementsByClassName("ingredients-container");
    // @ts-ignore
    for(let ingredient of ingredients){
      listIngredients.push(new Ingredients(ingredient.children[0].value,ingredient.children[1].value));
    }

    let steps = document.getElementsByClassName("steps-container");
    // @ts-ignore
    for(let step of steps){
      listSteps.push(new Steps(step.children[0].value));
    }
    newRecipe = new Recipe(title,category,serving,listSteps,calories,time,listIngredients,"soumya",image);
    this.recipeService.addRecipe(newRecipe).subscribe(
      newRecipe => {
        //  data is the added recipe object returned
        this.data.setCurrentRecipe(newRecipe);
        //  using data service set and navigate to recipesDetail page
        this.recipeDetails();
      },
      error => {
        console.log(error);
      }
    );
  }

  // Routing to recipe-details page once recipe is successfully created
  recipeDetails() {
    this.router.navigate(['recipe-details']);
  }

}
