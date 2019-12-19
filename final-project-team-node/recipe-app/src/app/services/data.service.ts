import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Recipe } from "../models/recipe.model";

@Injectable({
  providedIn: 'root'
})

// shared service
export class DataService {

  r: Recipe;
  private recipeSource: BehaviorSubject<Recipe> = new BehaviorSubject<Recipe>(this.r);
  currentRecipe = this.recipeSource.asObservable();


  logged: boolean = false;
  private isLoggedSource : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.logged);
  isLoggedIn = this.isLoggedSource.asObservable();

  constructor() { }

  /**
   * method calls next on the BehaviorSubject to change its value.
   * @param recipe Recipe object
   */
  setCurrentRecipe(recipe: Recipe){
    console.log(recipe.id.toString());
    this.recipeSource.next(recipe);
  }

  /**
   * method calls next on the BehaviorSubject to change its value.
   * @param flag
   */
    setLoginState(flag: boolean){
      console.log(flag);
      this.isLoggedSource.next(flag);
  }

}
