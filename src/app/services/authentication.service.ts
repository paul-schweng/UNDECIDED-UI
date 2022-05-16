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
import {Router, RouteReuseStrategy} from "@angular/router";
import {UserService} from "./user.service";
import {clone} from "./clone";
import {CustomReuseStrategy} from "../providers/cache-route-reuse.strategy";


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
              private readonly userService: UserService,
              private readonly routeReuse: RouteReuseStrategy) {
    super(notification, imageService, http, router);
  }


  logout() {
    super.sendPostRequest('logout', {}).then(() => {
      this.authenticated = false;
      (<CustomReuseStrategy>this.routeReuse).clearHandlers();
      this.router.navigateByUrl('/login');
    })
  }


  login(credentials?: any): Promise<boolean> {

    const headers = new HttpHeaders(credentials ?
      {authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)} :
      {authorization: ''});

    if(!credentials)
      return super.sendGetRequest('authenticate').then(
        async () => {
          this.authenticated = true;

          //console.log("heereee")

          if(this.authenticated) {
            this.iAmUser = clone(EmptyUser);
            await this.loadUser();
          }

          return this.authenticated;
        })
        .catch(() => {return false;});


    return super.sendGetRequest('login', credentials, headers)
      .then(async (response: any) => {
        this.authenticated = response!=null && !!response['name'];

        if(this.authenticated) {
          this.iAmUser = clone(EmptyUser);
          await this.loadUser().then(() => {
              if (credentials?.rememberMe)
                this.setRememberMe();
            });
        }

        (<CustomReuseStrategy>this.routeReuse).clearHandlers()
        this.router.navigateByUrl('/');

        return this.authenticated;
      })
      .catch(() => {return false;});

  }

  private async loadUser(){
    return await this.userService.getUser()
      .then( user => {
        user.profileImage = {};
        user.profileImage.remote = `/api/img/user/${user.id}#a`;
        Object.assign(this.iAmUser, clone(user))
      } );
  }

  public setRememberMe(): Promise<any>{
    return super.sendGetRequest('rememberMe', undefined, undefined, true);
  }

  register(user: User): Promise<any>{
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
