import { Component, OnInit } from '@angular/core';
import { ZomatoService } from '../zomato.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {

  city: string;
  locations: any;
  locArray: any = [];
  bestRatedRestaurants: any = [];
  locationDetails: any = {};
  isLocationEmpty: boolean = false;
  flipped: boolean = false;
  hideCityTitle: boolean = false;
  topCuisines: any = [];
  rest: any;
  category: String;

  constructor(private zomatoService: ZomatoService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe( paramMap =>
      this.category = paramMap.get('category'));
    this.getLocDetails();
  }

  getLocDetails() {
    this.zomatoService.getLocationDetails(289, this.category)
      .subscribe(res => {
        this.bestRatedRestaurants = [];
        this.topCuisines = [];
        this.hideCityTitle = false;
        this.locationDetails = res;
        console.log(res);
        debugger;
        if (this.locationDetails) {
          for (let i = 0; i < 8; i++) {
            this.bestRatedRestaurants.push(this.locationDetails.restaurants[i]);
            this.bestRatedRestaurants[i].flipped = false;
          };

          // for(let j = 0; j < this.locationDetails.top_cuisines.length; j++){
          //   this.topCuisines.push(this.locationDetails.top_cuisines[j]);
          // }
          this.hideCityTitle = true;
        }
      });

  }

  flip(best) {
    best.flipped = !best.flipped;
  }

}
