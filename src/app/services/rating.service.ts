import { Injectable } from '@angular/core';
import {CommunicationRequestService} from "./lib/communication-request.service";
import {HttpParams} from "@angular/common/http";
import {Rating, RatingList} from "../models/rating";

@Injectable({
  providedIn: 'root'
})
export class RatingService extends CommunicationRequestService<RatingList>{
  protected readonly backendUrlExt = 'rating';

  public postRating(rating: Rating){
    return super.sendPostRequest(this.backendUrlExt, rating);
  }

  public editRating(rating: Rating) {
    return super.sendPutRequest(this.backendUrlExt, rating);
  }

  protected prepareRequestObjectParameter(reqParameter: RatingList): HttpParams {
    if(reqParameter.filter)
      return new HttpParams().set('filter', reqParameter.filter);
    return new HttpParams();
  }

  public getMyRatings(filter: string): Promise<RatingList> {
    return super.sendGetRequest(this.backendUrlExt, {filter: filter});
  }

}
