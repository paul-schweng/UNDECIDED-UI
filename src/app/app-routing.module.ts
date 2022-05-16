import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./routes/guards/auth.guard";
import {LoginGuard} from "./routes/guards/login.guard";
import {MAIN_ROUTES} from "./routes/mainRoutes";
import {AUTH_ROUTES} from "./routes/authRoutes";
import {AuthComponent} from "./components/auth/auth.component";
import {MainFrameComponent} from "./components/common/main-frame/main-frame.component";
import {PUBLIC_ROUTES} from "./routes/publicRoutes";
import {PublicComponent} from "./components/public/public.component";


const routes: Routes = [
  {path: '', component: MainFrameComponent, canActivate: [AuthGuard], children: MAIN_ROUTES},
  {path: '', component: AuthComponent, canActivate: [LoginGuard], children: AUTH_ROUTES},
  {path: '', component: PublicComponent, children: PUBLIC_ROUTES},

  //------------- IMPORTANT: this wildcard path must be the very last route!!! ------------------
  {path: '**', redirectTo: ''},
];

const routerOptions: ExtraOptions = {
  scrollOffset: [0, 64],
  anchorScrolling: 'enabled',
  onSameUrlNavigation: "reload"
  // ...any other options you'd like to use
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
