import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onDelete(event: Event) {
    const target: any = event.target;
    const parentNode: HTMLElement = target.parentNode;
    parentNode.remove();
  }

}
