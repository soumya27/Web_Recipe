/**
 * Recipe Creation Form Model
 */
import {Ingredients} from "./ingredient.model";
import {Steps} from "./steps.model";
import {Comments} from "./comment.model";

export class Recipe {
    id: string;
    title: string;
    category: string;
    serving: string;
    steps: Array<Steps>;
    calories: string;
    time: string;
    ingredients: Array<Ingredients>;
    author: string;
    image: string;
    video: string;
    createdDate: string;
    userComments: Array<Comments>;
    constructor(title: string,category: string,serving: string,
                steps:Array<Steps>, calories: string, time: string,
                ingredients:Array<Ingredients>,author: string,image: string){
      this.author= author;
      this.time = time;
      this.calories= calories;
      this.category = category;
      this.serving = serving;
      this.title = title;
      this.steps = steps;
      this.ingredients = ingredients;
      this.image = image;
    }
}
