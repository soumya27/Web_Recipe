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
}
