import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RecipeService} from "../../services/recipe.service";
import {Recipe} from "../../models/recipe.model";
import {JwtService} from "../../services/jwt.service";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.scss']
})

export class RecipeSearchComponent implements OnInit {

  // Using category list to build the display
  categories = ["All","Asian", "BBQ", "Beverages",
    "Breakfast","Dessert","Fast Food","Healthy",
    "Indian","Italian","Mexican","My Recipes"];

  author: string;

  @Output() recipes = new EventEmitter<Array<Recipe>>();

  constructor(private recipeService: RecipeService,
              private jwtService: JwtService,
              private data: DataService) {}

  ngOnInit() {
    this.data.isLoggedIn.subscribe((state: boolean) => {
        if(state){
          this.author = this.jwtService.getFromLocal("firstname");
        }
        else {
          this.author = "";
        }
      }
    )
  }

  /**
   *  Searching recipes by category and emitting to the parent component
   *  @param event Event Object
   */
  updateDisplay(event) {

    const category: string = event.tab.textLabel.toLowerCase();

    // todo fetch user name
    if(category!=="my recipes"){
      this.recipeService.getRecipeByCategory(category).subscribe(
        recipes=> {
            console.log("got recipes");
            this.recipes.emit(recipes);
        },
        error => {
          console.log("Failed to get recipes");
        }
      )
    } else {
      this.recipeService.getRecipeByUser(this.author).subscribe(
        userRecipes => {
            console.log("got user recipes");
          this.recipes.emit(userRecipes);
        },
        error => {
          console.log("Failed to get user recipes");
        }
      )
    }
  }
}
