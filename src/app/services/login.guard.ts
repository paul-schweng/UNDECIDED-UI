import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(public auth: AuthenticationService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.auth.authenticated) {
      this.router.navigate(['/']);
      return false;
    }
    return true;

  }

}
