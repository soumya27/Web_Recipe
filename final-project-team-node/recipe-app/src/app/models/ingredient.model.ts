/**
 * Ingredients Model Class
 */
export class Ingredients {
  id: string;
  name: string;
  amount: string;
  constructor(name: string,amount: string){
    this.name = name;
    this.amount = amount;
  }
}
