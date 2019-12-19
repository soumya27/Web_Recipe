import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { RecipeService } from '../services/recipe.service';
import {Recipe} from "../models/recipe.model";
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss']
})
export class NewRecipeComponent implements OnInit {

  private recipe: Recipe;
  // Using category list to build the display
  categories = ["Asian", "BBQ", "Beverages",
    "Breakfast","Dessert","Fast Food","Healthy",
    "Indian","Italian","Mexican"];

  cuisineType = "";
  items = [];
  itemsEdit = [];
  steps = [];
  ingredientNames = [];
  ingredientNamesEdit = [];
  ingredientAmount = [];
  ingredientAmountEdit = [];
  stepsArray = [];
  stepsArrayEdit = [];
  count = 0;

  constructor(public recipeService: RecipeService,
              public ingredientService : RecipeService,
              private router: Router,
              private data : DataService) { }

  ngOnInit() {
    this.data.currentRecipe.subscribe((data : Recipe) => {
      this.recipe = data;
    });
  }

  isObj(recipe) {
    return typeof recipe === 'object';
  }

  isNotObj(recipe) {
    return typeof recipe !== 'object';
  }

  // Opening Cuisine Selection Form
  openForm() {
    document.getElementById("loginPopup").style.display="flex";
  }

  // Closing Cuisine Selection Form on Selecting the cuisine
  closeForm() {
    document.getElementById("loginPopup").style.display= "none";
  }

  // Sending recipe related information to the database if all required fields filled
  onCreateRecipe(form: NgForm) {
    if (this.cuisineType === "") {
      alert('Cuisine Type is Missing');
      return;
    }
    // this.onStepsAdd();
    console.log(form);
    if(form.invalid) {
      console.log("Inside invalid");
      alert("missing fields to be filled");
      // return;
    }
    else {
      this.onStepsAdd();
      let imagePath = (<HTMLInputElement>document.getElementsByName("image")[0]).value;
      this.recipeService.addRecipe(form.value.name, this.cuisineType, form.value.servings, form.value.calories, form.value.time, this.ingredientNames, this.ingredientAmount, this.stepsArray,imagePath).subscribe(
        recipe => {
          this.data.setCurrentRecipe(recipe);
          this.RecipeDetails();
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  onStepsAdd() {
    for (let index = 0; index < this.steps.length; index++) {
      let instructionId = 'instruction'+index;
      let step = (<HTMLInputElement>document.getElementById(instructionId)).value;
      if(step == "" || step == " ") {
        alert("Step"+(index+1)+" is empty!");
      }
      else {
        this.stepsArray.push(step);
      }
      console.log(this.stepsArray);

    }
  }

  onStepsAddForEdit(length) {
    for (let index = 0; index < length; index++) {
      let instructionId = 'instructionEdit'+index;
      let step = (<HTMLInputElement>document.getElementById(instructionId)).value;
      if(step == "" || step == " ") {
        alert("Step"+(index+1)+" is empty!");
      }
      else {
        this.stepsArrayEdit.push(step);
      }
    }
  }

  // Storing cuisine selected value
  onSelectCuisine(cuisine) {
    console.log("Passed cuisine:"+cuisine);
    console.log("Default Cusine:"+this.cuisineType);
    this.cuisineType = cuisine;
    this.closeForm();
    console.log("Stored cuisine:"+this.cuisineType);
    document.getElementById('cuisineDiv').innerHTML = this.cuisineType;
  }

  // Storing length of ingredients element in an array
  public loadMyChildComponent() {
    this.items = [...this.items, this.items.length];
    console.log(this.items);
  }

  loadMyChildComponentEdit() {
    this.itemsEdit = [...this.itemsEdit, this.itemsEdit.length];
    console.log(this.itemsEdit);
  }

  loadMyStepsComponent() {
    this.steps = [...this.steps, this.steps.length]
  }

  // Ingredients Delete functionality
  onDelete(i) {
    console.log("Inside onDelete()");

    // Removing entire element
    this.items.splice(i,1);

    // Removing respective ingredient name and its Amount
    this.ingredientNames.splice(i,1);
    this.ingredientAmount.splice(i,1);
    this.count = this.ingredientAmount.length;
  }

  onDeleteEdit(i) {
    console.log("Inside onDelete()");

    // Removing entire element
    this.itemsEdit.splice(i,1);

    // Removing respective ingredient name and its Amount
    this.ingredientNamesEdit.splice(i,1);
    this.ingredientAmountEdit.splice(i,1);
  }

  // Storing Ingredients Name and its respective quantity
  onAdd(i) {
    console.log("In ADd",i);
    let idName = "name"+i,
    idAmount = "amount"+i,
    addButton = "add"+i,
    requiredDiv = "required"+i;

    console.log('id',idName);

    let ingredientName = (<HTMLInputElement>document.getElementById(idName)).value;

    console.log("Value:",(<HTMLInputElement>document.getElementById(idName)).value);
    console.log(ingredientName);

    let amount = (<HTMLInputElement>document.getElementById(idAmount)).value;

    console.log(amount);

    (<HTMLInputElement>document.getElementById(addButton)).disabled = true;
    (<HTMLInputElement>document.getElementById(requiredDiv)).innerHTML = "";

    this.ingredientNames.push(ingredientName);
    this.ingredientAmount.push(amount);

    console.log(this.ingredientNames, this.ingredientAmount);
    this.count = this.ingredientAmount.length;
  }

  onAddEdit(i) {
    this.cuisineType = document.getElementById("cuisineDiv").innerText;
    if (this.cuisineType === "") {
      alert('Cuisine Type is Missing');
      return;
    }
    console.log("In ADd",i);
    let idName = "nameEdit"+i,
    idAmount = "amountEdit"+i,
    addButton = "addEdit"+i,
    requiredDiv = "requiredEdit"+i;

    console.log('id',idName);

    let ingredientName = (<HTMLInputElement>document.getElementById(idName)).value;

    console.log("Value:",(<HTMLInputElement>document.getElementById(idName)).value);
    console.log(ingredientName);

    let amount = (<HTMLInputElement>document.getElementById(idAmount)).value;

    console.log(amount);

    (<HTMLInputElement>document.getElementById(addButton)).disabled = true;
    (<HTMLInputElement>document.getElementById(requiredDiv)).innerHTML = "";

    this.ingredientNamesEdit.push(ingredientName);
    this.ingredientAmountEdit.push(amount);
  }

  // Routing to recipe-details page once recipe is successfully created
  RecipeDetails(){
    this.router.navigate(['recipe-details']);
  }

  onEdit(form: NgForm, id: string) {
    console.log("Inside Edit");
    console.log(this.ingredientAmount);
    console.log(this.ingredientNames);
    if(form.invalid) {
      console.log("Inside invalid");
      alert("missing fields to be filled");
      // return;
    }
    else {
      console.log("Inside Edit Valid");
      let length = Object.keys(this.recipe.steps).length;
      console.log(length);
      this.onStepsAdd();
      this.onStepsAddForEdit(length);
      let finalSteps = this.stepsArray.concat(this.stepsArrayEdit);
      let finalIngredientName = this.ingredientNames.concat(this.ingredientNamesEdit);
      let finalIngredientAmount = this.ingredientAmount.concat(this.ingredientAmountEdit);
      let imagePath = (<HTMLInputElement>document.getElementsByName("image")[0]).value;

      this.recipeService.editRecipe(form.value.name, this.cuisineType, form.value.servings, form.value.calories, form.value.time, finalIngredientName, finalIngredientAmount, finalSteps, imagePath, id)
      .subscribe(
        recipe => {
          console.log("R",recipe);
          this.data.setCurrentRecipe(recipe);
          this.RecipeDetails();
        },
        error => {
          console.log(error);
        }
      );

      }
    }
  }
