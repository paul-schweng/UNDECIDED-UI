import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./services/auth.guard";
import {LoginGuard} from "./services/login.guard";
import {MAIN_ROUTES} from "./routes/mainRoutes";
import {AUTH_ROUTES} from "./routes/authRoutes";
import {AuthComponent} from "./components/auth/auth.component";
import {MainFrameComponent} from "./components/common/main-frame/main-frame.component";

const routes: Routes = [
  {path: '', component: MainFrameComponent, canActivate: [AuthGuard], children: MAIN_ROUTES},
  {path: '', component: AuthComponent, canActivate: [LoginGuard], children: AUTH_ROUTES},

  //------------- IMPORTANT: this wildcard path must be the very last route!!! ------------------
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
