import {
  Injectable
} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../models/user";
import {UserService} from "./user.service";
import {SampleUser} from "./SampleData";
import {Subject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public authenticated: boolean = false;
  private _onUserChanges: Subject<User> = new Subject<User>();
  get onUserChanges() {
    return this._onUserChanges.asObservable();
  }


  private _iAmUser: User = {} as User;
  set iAmUser(user: User) {
    this._iAmUser = user;
    this._onUserChanges.next(user);
  }
  get iAmUser() {
    return this._iAmUser;
  }


  public notifyChange() {
    this._onUserChanges.next(this._iAmUser);

  }




  constructor(private readonly http: HttpClient,
              private readonly router: Router,
              private readonly userService: UserService) {


    new Promise(() => {
    }).then(() => {

    })


  }


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

        if(this.authenticated){
          localStorage.setItem('credentials', JSON.stringify(credentials));

          //TODO: uncomment this and delete other line
          //this.userService.getUser().then(user => this.iAmUser = user);
          this.iAmUser = SampleUser;
        }

        return this.authenticated;
      }, () => {return false;});

  }







}
