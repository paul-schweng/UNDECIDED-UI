import {HomeComponent} from "../components/home/home.component";
import {SearchComponent} from "../components/search/search.component";
import {ProfileComponent} from "../components/profile/profile.component";
import {RatingsComponent} from "../components/ratings/ratings.component";
import {EditProfileComponent} from "../components/profile/edit-profile/edit-profile.component";
import {Routes} from "@angular/router";

export const MAIN_ROUTES: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'search', component: SearchComponent},
  {path: 'ratings', component: RatingsComponent},
  {path: 'profile', component: ProfileComponent, children: [{
      path: 'edit', component: EditProfileComponent
    }]},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
]
