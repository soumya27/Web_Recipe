import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Router } from '@angular/router';
import { Recipe } from '../models/recipe.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {

  city: string;
  flipped: boolean = false;
  rest: any;
  private recipe: Recipe;


  constructor(private router: Router, private recipeService: RecipeService, private data: DataService) { }

  ngOnInit() {
    this.data.currentRecipe.subscribe((data : Recipe) => {
      this.recipe = data;
    });

    (<HTMLInputElement>document.getElementsByClassName("wrapper").item(0)).style.background = 'none';
  }

  // getRes

  getRestaurantList(category){
    this.router.navigate(['restaurants', category]);
  }

  backBtn(){
    this.router.navigate(['']);
  }

}
