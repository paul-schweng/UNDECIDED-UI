import {Publisher} from "./Publisher";
import {User} from "../../models/user";
import {CustomReuseStrategy} from "../../providers/cache-route-reuse.strategy";
import {HttpHeaders} from "@angular/common/http";
import {clone} from "../clone";
import {EmptyUser} from "../SampleData";

export class AuthenticationService extends Publisher<User>{

  protected readonly backendUrl = '../auth/';

  logout() {

  }

/*
  login(credentials?: any): Promise<boolean> {


  }

  private async loadUser(){

  }

  public setRememberMe(): Promise<any>{

  }

  register(user: User): Promise<any>{

  }

  public isUsernameAvailable(username: string): Promise<boolean> {

  }

 */

}
