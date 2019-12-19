import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {
  items = [];
  listIngredientName: any = [];

  constructor() { }

  ngOnInit() {
  }

  onDelete(i) {
    console.log("Inside onDelete()");
    this.items.splice(i,1);
  }

  public loadMyChildComponent() {
    this.items = [...this.items, this.items.length]
    console.log(this.items);
  }

  onAdd(i) {
    console.log(i);
    let idName = "name"+i;
    let idAmount = "amount"+i;
    console.log('id',idName);
    let ingredientName = (<HTMLInputElement>document.getElementById(idName)).value;
    console.log(ingredientName);
    let amount = (<HTMLInputElement>document.getElementById(idAmount)).value;
    console.log(amount);
  }
}
