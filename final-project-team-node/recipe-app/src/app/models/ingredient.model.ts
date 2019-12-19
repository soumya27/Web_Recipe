/**
 * Ingredients Model Class
 */
export class Ingredients {
  id: string;
  name: string;
  amount: string;
  constructor(id: string,name: string,amount: string){
    this.id = id;
    this.name = name;
    this.amount = amount;
  }
}
