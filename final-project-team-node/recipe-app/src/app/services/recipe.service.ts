import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../models/recipe.model';
import {JwtService} from "./jwt.service";

@Injectable({
    providedIn: 'root'
})

export class RecipeService {

  recipeResource: string;
  recipeResourceURL: string;

  constructor(private httpClient: HttpClient, private jwtService: JwtService) {
    this.recipeResource = 'recipes';
    this.recipeResourceURL=`${environment.serverBaseURL}/${this.recipeResource}`;
  }

  /**
   * Recipe details
   * @param recipe Recipe
   */
  addRecipe(recipe: Recipe): Observable<Recipe> {
    //todo work on the image path
    // recipe.image = recipe.image.replace("C:\\fakepath\\","../../assets/userImages/");
    return this.httpClient.post<Recipe>(this.recipeResourceURL, recipe);
  }

  editRecipe(recipe: Recipe) {
    recipe.image = recipe.image.replace("C:\\fakepath\\","../../assets/userImages/");
    return this.httpClient.put<Recipe>(this.recipeResourceURL, recipe);
  }

  /*
  * Get all recipes
  */
  getRecipes(): Observable<Array<Recipe>>{
    return this.httpClient.get<Array<Recipe>>(this.recipeResourceURL);
  }

  /**
  * Fetch recipes by category
  * @param category Recipe Category
  */
  getRecipeByCategory(category: string): Observable<Array<Recipe>>{
    let findByCategory: string;
    if(category !== "all")
      findByCategory = this.recipeResourceURL+`?category=${category}`;
    else
      findByCategory = this.recipeResourceURL;
    return this.httpClient.get<Array<Recipe>>(findByCategory);
  }

  /**
   * Fetch recipes by user/author
   * @param author Recipe Author
   */
  getRecipeByUser(author: string): Observable<Array<Recipe>>{
    const findByAuthor: string = this.recipeResourceURL+`?author=${author}`;
    return this.httpClient.get<Array<Recipe>>(findByAuthor);
  }

  /**
   * Delete recipe by id
   * @param id Recipe Id
   */
  deleteRecipe(id: string): Observable<Recipe> {
    const recipeItem: string = this.recipeResourceURL + `/${id}`;
    return this.httpClient.delete<Recipe>(recipeItem);
  }

  /**
   *  Update recipe item
   *  @param recipe Recipe Object
   */
  updateRecipe(recipe: Recipe ): Observable<Recipe> {
    console.log(recipe);
    const recipeItem: string = this.recipeResourceURL+`/${recipe.id}`;
    console.log("recipeItem",recipeItem);
    return this.httpClient.put<Recipe>(recipeItem,recipe);
  }

  /**
   * Get Recipe Details by ID
   */
  getRecipeById(id: String): Observable<Array<Recipe>>{
    const findById: string = this.recipeResourceURL+`?id=${id}`;
    return this.httpClient.get<Array<Recipe>>(findById);
  }

  /**
   * Get Recipe Details by ID by Obj
   */
  getRecipeByIdObj(id: String): Observable<Recipe>{
    const findById: string = this.recipeResourceURL+`?id=${id}`;
    return this.httpClient.get<Recipe>(findById);
  }
}
