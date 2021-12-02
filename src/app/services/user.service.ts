import { Injectable } from '@angular/core';
import {CommunicationRequestService} from "./lib/communication-request.service";
import {HttpParams} from "@angular/common/http";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService extends CommunicationRequestService<User>{
  protected readonly backendUrlExt = 'user';

  public changeEmail(currentEmail: string, newEmail: string): Promise<User> {
    return super.sendPutRequest(this.backendUrlExt + '/email', {current: currentEmail, new: newEmail});
  }


  public changePassword(currentPwd: string, newPwd: string): Promise<User> {
    return super.sendPutRequest(this.backendUrlExt + '/password', {current: currentPwd, new: newPwd});
  }


  public getUser(): Promise<User> {
    return super.sendGetRequest(this.backendUrlExt);
  }


  public updateUser(user: User): Promise<User> {
    return super.sendPutRequest(this.backendUrlExt, user);
  }



  protected prepareRequestObjectParameter(reqParameter: User): HttpParams {
    return new HttpParams();
  }


}
