import { Injectable } from '@angular/core';
import {CommunicationRequestService} from "./lib/communication-request.service";
import {HttpParams} from "@angular/common/http";
import {Rating} from "../models/rating";

@Injectable({
  providedIn: 'root'
})
export class RatingService extends CommunicationRequestService<Rating>{
  protected readonly backendUrlExt = 'rating';

  public postRating(rating: Rating){
    return super.sendPostRequest(this.backendUrlExt, rating);
  }

  public editRating(rating: Rating) {
    return super.sendPutRequest(this.backendUrlExt, rating);
  }

  protected prepareRequestObjectParameter(reqParameter: Rating): HttpParams {
    return new HttpParams();
  }

}
