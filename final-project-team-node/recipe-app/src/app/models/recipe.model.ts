/**
 * Ingredients Model Interface
 */
export interface Ingredients {
  id: string;
  name: string;
  amount: string;
}

export interface Steps {
  id: string;
  steps: string;
}

export interface Comments {
    id: String;
    name: String;
    emailAddress: String;
    comment: String;
    rating: String;
}

/**
 * Recipe Creation Form Model
 */
export interface Recipe {
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
