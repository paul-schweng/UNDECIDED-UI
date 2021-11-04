import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {SearchComponent} from "./components/search/search.component";
import {RatingsComponent} from "./components/ratings/ratings.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {EditProfileComponent} from "./components/profile/edit-profile/edit-profile.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {RegisterComponent} from "./components/auth/register/register.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'search', component: SearchComponent},
  {path: 'ratings', component: RatingsComponent},
  {path: 'profile', component: ProfileComponent, children: [{
    path: 'edit', component: EditProfileComponent
    }]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
