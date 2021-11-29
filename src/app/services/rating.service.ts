import { Injectable } from '@angular/core';
import {CommunicationRequestService} from "./lib/communication-request.service";
import {HttpParams} from "@angular/common/http";
import {Rating, RatingList} from "../models/rating";
import {Label, LABELS} from "../models/label";

@Injectable({
  providedIn: 'root'
})
export class RatingService extends CommunicationRequestService<RatingList>{
  protected readonly backendUrlExt = 'rating';

  public postRating(rating: Rating){
    if(rating.images)
      this.imageService.postRatingImages(rating);
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
    return super.sendGetRequest<RatingList>(this.backendUrlExt, {filter: filter}).then(ratingList => {
      let ratings = ratingList.ratings || [];
      ratings.forEach(rating => {
        let labels: Label[] = [];
        if (!rating.labels) return;
        for (let i of rating.labels) {
          labels.push(LABELS.find(label => label.id == i)!);
        }
        rating.labelList = labels;
      });
      ratingList.ratings = ratings;
      return ratingList;
    });
  }

}
