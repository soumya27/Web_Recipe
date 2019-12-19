import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onDelete(event: Event) {
    const target: any = event.target;
    const parentNode: HTMLElement = target.parentNode;
    parentNode.remove();
  }

}
