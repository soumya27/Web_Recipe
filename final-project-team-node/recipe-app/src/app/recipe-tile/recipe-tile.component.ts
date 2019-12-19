import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Recipe} from "../models/recipe.model";
import {DataService} from "../services/data.service";
import {Router} from "@angular/router";
import {RecipeService} from "../services/recipe.service";
import {JwtService} from "../services/jwt.service";

@Component({
  selector: 'app-recipe-tile',
  templateUrl: './recipe-tile.component.html',
  styleUrls: ['./recipe-tile.component.scss']
})
export class RecipeTileComponent implements OnInit {

  state: boolean = false;
  user: string;
  @Input() recipe: Recipe;
  @Output() updateRecipeListEvent = new EventEmitter<Array<Recipe>>();
  classObject: object = {
    recipe: 'recipe'
  };

  constructor(private data: DataService,
              private router: Router,
              private recipeService: RecipeService,
              private jwtService: JwtService) {}

  ngOnInit() {
    this.data.isLoggedIn.subscribe((state: boolean) => {
        if(state){
          this.user = this.jwtService.getFromLocal("firstname");
        }
        else {
          this.user = "";
        }
      }
    )
  }

  /**
   *  Setting the selected recipe to currentRecipe
   */
  setCurrentRecipe(){
    this.data.setCurrentRecipe(this.recipe);
    this.router.navigate(['recipe-details']);
  }

  /**
   *  method to edit recipe
   */
  editRecipe(){
    this.data.setCurrentRecipe(this.recipe);
    this.router.navigate(['new-recipe']);
  }

  /**
   *  method to delete recipe
   */
  deleteRecipe(){
    if(confirm("Are you sure ?")){
      this.data.setCurrentRecipe(this.recipe);
      this.recipeService.deleteRecipe(this.recipe.id).subscribe(
        data => {
          console.log("successfully delete ");
          this.recipeService.getRecipes().subscribe(
            recipes=>{
              this.updateRecipeListEvent.emit(recipes);
            },
            error => {
              console.log("failed to fetch");
            }
          )
        },
        error => {
          console.log("failed to delete");
        }
      );
      //notify user in search area
      this.router.navigate([''])
    }
  }

}
