/**
 * Recipe Creation Form Model
 */
export class Recipe {
    id: string;
    title: string;
    category: string;
    serving: string;
    steps: Object;
    calories: string;
    time: string;
    ingredients: Object;
    author: string;
    image: string;
    video: string;
    createdDate: string;
    userComments: Object;
    constructor(title: string,category: string,serving: string,
                steps:Object, calories: string, time: string,
                ingredients:Object,author: string,image: string){
      this.author= author;
      this.time = time;
      this.calories= calories;
      this.category = category;
      this.serving = serving;
      this.title = title;
      this.steps = steps;
      this.ingredients = ingredients;
    }
}
