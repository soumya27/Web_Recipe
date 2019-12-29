import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { LoginComponent } from './login/login.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import {RegisterComponent} from "./login/register/register.component";
import { RestaurantsComponent } from './restaurants/restaurants.component';
import {RecipeDisplayComponent} from "./recipe-display/recipe-display.component";
import {ContactusComponent} from "./contactus/contactus.component";
import {HomepageComponent} from "./homepage/homepage.component";
import { ForgotPasswordComponent } from "./login/forgot-password/forgot-password.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";

const routes: Routes = [
  {
    path: '',
    component: RecipeDisplayComponent
  },
  {
    path: 'recipe-details',
    component: RecipeDetailsComponent
  },
  {
    path: 'new-recipe',
    component: NewRecipeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'restaurants',
    component: RestaurantsComponent
  },
  {
    path: 'restaurants/:category',
    component: RestaurantsComponent
  },
  {
    path: 'contactus',
    component: ContactusComponent
  },
  {
    path: 'home',
    component: HomepageComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'search',
    component: RecipeDisplayComponent
  },
  {
    path: 'profile',
    component: UserProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
