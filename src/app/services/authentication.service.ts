import {
  Injectable
} from '@angular/core';
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {User} from "../models/user";
import {SampleUser} from "./SampleData";
import {Subject} from "rxjs";
import {CommunicationRequestService} from "./lib/communication-request.service";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends CommunicationRequestService<any> {

  protected readonly backendUrl = '../auth/';


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
    super.sendPostRequest('logout', {}).then(() => {
      this.authenticated = false;
      localStorage.removeItem('credentials');
      this.router.navigateByUrl('/login');
    })
  }


  login(credentials: any): Promise<boolean> {

    const headers = new HttpHeaders(credentials ?
      {authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)} :
      {authorization: ''});

    return super.sendGetRequest('login', credentials, headers)
      .then((response: any) => {
        this.authenticated = response!=null && !!response['name'];

        if(this.authenticated) {
          localStorage.setItem('credentials', JSON.stringify(credentials));

          //TODO: uncomment this and delete other line
          //this.userService.getUser().then(user => this.iAmUser = user);
          this.iAmUser = SampleUser;
        }
        return this.authenticated;

      }, () => {return false;});

  }

  register(user: User): Promise<boolean>{
    user.birthdate = (<Date>user.birthdate)?.toISOString().split("T")[0];
    return super.sendPostRequest('register', user);
  }

  public isUsernameAvailable(username: string): Promise<{available: boolean}> {
    return super.sendGetRequest('user-available', {partUsername: username});
  }


  protected prepareRequestObjectParameter(reqParameter: any): HttpParams {
    if(reqParameter.rememberMe)
      return new HttpParams().set('rememberMe', reqParameter.rememberMe);
    if(reqParameter.partUsername)
      return new HttpParams().set('u', reqParameter.partUsername)

    return new HttpParams();
  }





}
