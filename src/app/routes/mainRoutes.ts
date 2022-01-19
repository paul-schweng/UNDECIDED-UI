import {HomeComponent} from "../components/home/home.component";
import {SearchComponent} from "../components/search/search.component";
import {ProfileComponent} from "../components/profile/profile.component";
import {RatingsComponent} from "../components/ratings/ratings.component";
import {Routes} from "@angular/router";
import {SettingsComponent} from "../components/profile/settings/settings.component";

export const MAIN_ROUTES: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'search', component: SearchComponent, children:[
      {path: 'user/:username', component: ProfileComponent}
    ]},
  {path: 'ratings', component: RatingsComponent},
  {path: 'profile', component: ProfileComponent, children:[
      {path: 'edit', component: ProfileComponent}
    ]},
  {path: 'profile/settings', component: SettingsComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
]
