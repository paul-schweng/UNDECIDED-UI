import { Injectable } from '@angular/core';
import {CommunicationRequestService} from "./lib/communication-request.service";
import {HttpParams} from "@angular/common/http";
import {User} from "../models/user";
import {clone} from "./clone";

@Injectable({
  providedIn: 'root'
})
export class UserService extends CommunicationRequestService<User | any>{
  protected readonly backendUrlExt = 'user';

  public changeEmail(currentEmail: string, newEmail: string): Promise<User> {
    return super.sendPutRequest(this.backendUrlExt + '/email', {current: currentEmail, new: newEmail});
  }


  public changePassword(currentPwd: string, newPwd: string): Promise<User> {
    return super.sendPutRequest(this.backendUrlExt + '/password', {current: currentPwd, new: newPwd});
  }


  public getUser(username?: string): Promise<User> {
    return super.sendGetRequest(username ? this.backendUrlExt + '/u/' + username : this.backendUrlExt);
  }

  public deleteUser(){
    return super.sendDeleteRequest(this.backendUrlExt);
  }


  public updateUser(user: User): Promise<User> {
    let image = user.profileImage;
    let userWithoutImages: User = clone(user);
    delete userWithoutImages['profileImage'];

    if(user.profileImage){
      //if only profile image was changed
      if(JSON.stringify(userWithoutImages) == JSON.stringify({}))
        return this.imageService.postUserImage(image);
      //if profile image and something else was changed
      else
        return super.sendPutRequest<User>(this.backendUrlExt, userWithoutImages)
          .then(user1 =>
              this.imageService.postUserImage(image)
                .then(user2 => {return user2;}, () => {return user1;})
          );
    }
    //if profile image wasn't changed
    else
      return super.sendPutRequest<User>(this.backendUrlExt, userWithoutImages);
  }


  public followUser(userId: string): Promise<any> {
    return super.sendGetRequest(this.backendUrlExt + '/follow', {id: userId}, undefined, true);
  }

  public isFollowing(userId: string): Promise<boolean> {
    return super.sendGetRequest<any>(this.backendUrlExt + '/following', {id: userId})
      .then(isFollowing => {
        return isFollowing.isFollowing;
      });
  }

  public unfollowUser(userId: string): Promise<any> {
    return super.sendDeleteRequest(this.backendUrlExt + '/unfollow', {id: userId});
  }

  public getFollower(userid: string, timestamp?: Date): Promise<User[]>{
    return super.sendPostRequest(this.backendUrlExt + '/myFollower', {userid: userid, timestamp: timestamp || new Date()});
  }

  public getFollowing(userid: string, timestamp?: Date): Promise<User[]>{
    return super.sendPostRequest(this.backendUrlExt + '/myFollowing', {userid: userid, timestamp: timestamp || new Date()});
  }

  public getFriends(userid: string, timestamp?: Date): Promise<User[]>{
    return super.sendPostRequest(this.backendUrlExt + '/myFriends', {userid: userid, timestamp: timestamp || new Date()});
  }

  protected prepareRequestObjectParameter(reqParameter: User | any): HttpParams {
    if(reqParameter.id)
      return new HttpParams().set('id', reqParameter.id);

    return new HttpParams();
  }

  deleteProfileImage(): Promise<any>{
    return super.sendDeleteRequest('img/user');
  }


}
