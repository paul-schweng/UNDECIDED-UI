import {HomeComponent} from "../components/home/home.component";
import {SearchComponent} from "../components/search/search.component";
import {ProfileComponent} from "../components/profile/profile.component";
import {RatingsComponent} from "../components/ratings/ratings.component";
import {Routes} from "@angular/router";
import {SettingsComponent} from "../components/profile/settings/settings.component";
import {ChangeEmailComponent} from "../components/profile/settings/change-email/change-email.component";
import {ChangePasswordComponent} from "../components/profile/settings/change-password/change-password.component";
import {MoreSettingsComponent} from "../components/profile/settings/more-settings/more-settings.component";
import {SearchResultsComponent} from "../components/search/search-results/search-results.component";
import {OpenRatingComponent} from "../components/search/open-rating/open-rating.component";

export const MAIN_ROUTES: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'search', component: SearchComponent, children:[
      {path: 'user/:username', component: ProfileComponent},
      {path: 'rating/:id', component: OpenRatingComponent},
      {path: 'results/:query', component: SearchResultsComponent}
    ]},
  {path: 'ratings', component: RatingsComponent},
  {path: 'profile', component: ProfileComponent, children:[
      {path: 'edit', component: ProfileComponent}
    ]},
  {path: 'profile/settings', component: SettingsComponent, children:[
      {path: 'change-email', component: ChangeEmailComponent},
      {path: 'change-password', component: ChangePasswordComponent},
      {path: 'more-settings', component: MoreSettingsComponent}
    ]},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
]
