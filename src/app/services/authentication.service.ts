import {
  Injectable
} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {User} from "../models/user";
import {EmptyUser} from "./SampleData";
import {Subject} from "rxjs";
import {CommunicationRequestService} from "./lib/communication-request.service";
import {NotificationService} from "./notification.service";
import {ImageService} from "./image.service";
import {Router} from "@angular/router";
import {UserService} from "./user.service";
import {clone} from "./clone";


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

  constructor(protected notification: NotificationService,
              protected imageService: ImageService,
              protected http: HttpClient,
              protected router: Router,
              private readonly userService: UserService) {
    super(notification, imageService, http, router);
  }


  logout() {
    super.sendPostRequest('logout', {}).then(() => {
      this.authenticated = false;
      localStorage.removeItem('credentials');
      this.router.navigateByUrl('/login');
    })
  }


  login(credentials?: any): Promise<boolean> {

    const headers = new HttpHeaders(credentials ?
      {authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)} :
      {authorization: 'Basic 1:2'});

    return super.sendGetRequest('login', credentials, headers)
      .then(async (response: any) => {
        this.authenticated = response!=null && !!response['name'];

        if(this.authenticated) {
          //localStorage.setItem('credentials', JSON.stringify(credentials));

          this.iAmUser = clone(EmptyUser);

          await this.userService.getUser()
            .then(user => Object.assign(this.iAmUser, clone(user)))
            .then(() => {
              if (credentials.rememberMe)
                this.setRememberMe();
            });

          //this.iAmUser = SampleUser;
        }
        return this.authenticated;

      }, () => {return false;});

  }

  public setRememberMe(): Promise<any>{
    return super.sendGetRequest('rememberMe');
  }

  register(user: User): Promise<boolean>{
    // user.birthdate = (<Date>user.birthdate)?.toISOString().split("T")[0];
    return super.sendPostRequest('register', user);
  }

  public isUsernameAvailable(username: string): Promise<{available: boolean}> {
    return super.sendGetRequest('user-available', {partUsername: username});
  }


  protected prepareRequestObjectParameter(reqParameter: any): HttpParams {
    if(reqParameter.partUsername)
      return new HttpParams().set('u', reqParameter.partUsername)

    return new HttpParams();
  }





}
