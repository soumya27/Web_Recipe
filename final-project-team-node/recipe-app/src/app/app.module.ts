import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { IngredientsComponent } from './new-recipe/ingredients/ingredients.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ContactusComponent } from './contactus/contactus.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RecipeTileComponent } from './recipe-tile/recipe-tile.component';
import { RecipeDisplayComponent } from './recipe-display/recipe-display.component';
import { RecipeSearchComponent } from './recipe-display/recipe-search/recipe-search.component';
import { UserCommentsComponent } from './user-comments/user-comments.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InterceptorModule } from './zomatoservice.interceptor';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { AuthComponent } from './auth/auth.component';
import { JwtInterceptor } from './jwt.interceptor';
import { ErrorInterceptor } from './error.interceptor';
import { StorageServiceModule} from 'angular-webstorage-service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import { StepsComponent } from './new-recipe/steps/steps.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipeDetailsComponent,
    NavBarComponent,
    NewRecipeComponent,
    IngredientsComponent,
    HomepageComponent,
    ContactusComponent,
    LoginComponent,
    HeaderComponent,
    RegisterComponent,
    FooterComponent,
    UserCommentsComponent,
    RestaurantsComponent,
    SideBarComponent,
    RecipeTileComponent,
    RecipeDisplayComponent,
    RecipeSearchComponent,
    UserCommentsComponent,
    AuthComponent,
    ForgotPasswordComponent,
    StepsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    InterceptorModule,
    StorageServiceModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
