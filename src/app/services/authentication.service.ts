import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public authenticated: boolean = false;
  public iAmUser: User | undefined;

  constructor(private http: HttpClient,
              private router: Router) { }

  logout() {
    this.http.post('/logout', {}).subscribe(() => {
      this.authenticated = false;
      localStorage.removeItem('credentials');
      this.router.navigateByUrl('/login');

    });
  }


  authenticate(credentials: any): Promise<boolean> {

    const headers = new HttpHeaders(credentials ?
      {authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)} : {ola:'boy'});

    return this.http.get('/api/user', {headers: headers}).toPromise()
      .then((response: any) => {
        this.authenticated = response!=null && !!response['name'];

        if(this.authenticated)
          localStorage.setItem('credentials', JSON.stringify(credentials));
        return this.authenticated;
      }, () => {return false;});

  }

}
