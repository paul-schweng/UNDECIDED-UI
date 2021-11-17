import {
  Injectable
} from '@angular/core';
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {User} from "../models/user";
import {SampleUser} from "./SampleData";
import {Subject} from "rxjs";
import {CommunicationRequestService} from "./communication-request.service";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends CommunicationRequestService<User> {

  protected readonly backendUrlExt = 'auth';
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




  logout() {
    this.http.post('/logout', {}).subscribe(() => {
      this.authenticated = false;
      localStorage.removeItem('credentials');
      this.router.navigateByUrl('/login');

    });
  }


  login(credentials: any): Promise<boolean> {

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

  register(user: User): Promise<boolean>{
    return super.sendPostRequest(this.backendUrlExt + '/register', user);
  }

  protected prepareRequestObjectParameter(reqParameter: User): HttpParams {
    return new HttpParams();
  }







}
