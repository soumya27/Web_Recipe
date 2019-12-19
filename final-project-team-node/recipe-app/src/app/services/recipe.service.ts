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
    private recipes: Recipe[] = [];
    private ingredient: [];
    private steps: [];
    private myJSON: String;

    recipeResource: string;
    recipeResourceURL: string;

    constructor(private httpClient: HttpClient, private jwtService: JwtService) {
      this.recipeResource = 'recipes';
      this.recipeResourceURL=`${environment.serverBaseURL}/${this.recipeResource}`;
    }

    /**
     * Recipe details
     * @param name Recipe Name
     * @param category Recipe Category
     * @param servings Recipe serves number of people
     * @param calories Calory intake for this recipe
     * @param time Time to get the recipe ready
     * @param ingredientName array of ingredient names
     * @param ingredientAmount array of ingredient amount respective to ingredient name
     * @param steps step by step instructions to prepare the recipe
     * @param image image path for recipe
     */
    addRecipe(name: string, category: string, servings: string, calories: string, time: string, ingredientName: any, ingredientAmount: any, steps: Array<String>, image: string) {

      /**
       * Steps array to JSON
       */
      let stepFormmated = [];
      for (let index = 0; index < steps.length; index++) {
          var o = {};
          o["id"] = null;
          o["steps"] = steps[index];
          stepFormmated.push(o);
      }
      console.log("Steps in JSON",stepFormmated);

      // Converting ingredients array to JSON
      let myarray = new Array(ingredientName.length);
      for (let index = 0; index < 3; index++) {
          myarray[index] = new Array(3);

      }
      console.log("add recipe");
      console.log(name, category, servings, calories, time);
      console.log("ingredient Name");
      console.log(ingredientName);
      console.log(ingredientAmount);
      console.log(ingredientName.length);

      for (let index = 0; index < ingredientName.length; index++) {
          myarray[index][0] = "null";
          myarray[index][1] = ingredientName[index];
          myarray[index][2] = ingredientAmount[index];
      }

      console.log(myarray.length);

      var keys = ["id","name","amount"];
      var formatted = [],
      data = myarray,
      cols = keys,
      l = cols.length;

      console.log("Data.length:"+data.length);
      console.log("l:"+l);

      // Converting 2D array to JSON
      for (var i=0; i<ingredientAmount.length; i++) {
              var d = data[i],
                      o = {};
              for (var j=0; j<l; j++)
                      o[cols[j]] = d[j];
              formatted.push(o);
      }
      console.log(formatted);

      // converting the path to relative
      image = image.replace("C:\\fakepath\\","../../assets/userImages/");
      const recipe: Recipe = {id: null, title: name, category: category, serving: servings, steps: stepFormmated, calories: calories, time: time, ingredients: formatted, author: this.jwtService.getFromLocal("firstname"), image: image, video: null, createdDate: null, userComments: null};
      return this.httpClient
      .post<Recipe>(this.recipeResourceURL, recipe);
  }

  editRecipe(name: string, category: string, servings: string, calories: string, time: string, ingredientName: any, ingredientAmount: any, steps: Array<String>, image: string, id: string) {

    /**
     * Steps array to JSON
     */
    let stepFormmated = [];
    for (let index = 0; index < steps.length; index++) {
        var o = {};
        o["id"] = null;
        o["steps"] = steps[index];
        stepFormmated.push(o);
    }
    console.log("Steps in JSON",stepFormmated);

    // Converting ingredients array to JSON
    let myarray = new Array(ingredientName.length);
    for (let index = 0; index < 3; index++) {
        myarray[index] = new Array(3);

    }
    console.log("add recipe");
    console.log(name, category, servings, calories, time);
    console.log("ingredient Name");
    console.log(ingredientName);
    console.log(ingredientAmount);
    console.log(ingredientName.length);

    for (let index = 0; index < ingredientName.length; index++) {
        myarray[index][0] = "null";
        myarray[index][1] = ingredientName[index];
        myarray[index][2] = ingredientAmount[index];
    }

    console.log(myarray.length);

    var keys = ["id","name","amount"];
    var formatted = [],
    data = myarray,
    cols = keys,
    l = cols.length;

    console.log("Data.length:"+data.length);
    console.log("l:"+l);

    // Converting 2D array to JSON
    for (var i=0; i<ingredientAmount.length; i++) {
            var d = data[i],
                    o = {};
            for (var j=0; j<l; j++)
                    o[cols[j]] = d[j];
            formatted.push(o);
    }
    console.log(formatted);
    image = image.replace("C:\\fakepath\\","../../assets/userImages/");
    let url = this.recipeResourceURL+"/"+id;
    console.log(url);
    const recipe: Recipe = {id: null, title: name, category: category, serving: servings, steps: stepFormmated, calories: calories, time: time, ingredients: formatted, author: this.jwtService.getFromLocal("firstname"), image: image, video: null, createdDate: null, userComments: null};
    return this.httpClient
    .put<Recipe>(url, recipe);

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
