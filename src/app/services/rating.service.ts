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
    let images = rating.images || [];
    let ratingWithoutImages: Rating = JSON.parse(JSON.stringify(rating));
    delete ratingWithoutImages['images'];
    return super.sendPostRequest<Rating>(this.backendUrlExt, ratingWithoutImages)
      .then(resRating => {
        if(rating.images)
          this.imageService.postRatingImages(resRating.id, images);
      });
  }

  public editRating(rating: Rating) {
    let images = rating.images || [];
    let ratingWithoutImages: Rating = JSON.parse(JSON.stringify(rating));
    delete ratingWithoutImages['images'];
    return super.sendPutRequest<Rating>(this.backendUrlExt, rating)
      .then(resRating => {
        if(images)
          this.imageService.postRatingImages(resRating.id, images);
      });
  }

  protected prepareRequestObjectParameter(reqParameter: RatingList): HttpParams {
    if(reqParameter.filter)
      return new HttpParams().set('filter', reqParameter.filter);
    return new HttpParams();
  }

  public getMyRatings(filter: string): Promise<Rating[]> {
    return super.sendGetRequest<Rating[]>(this.backendUrlExt + 's', {filter: filter}).then(ratingList => {
      let ratings = ratingList || [];
      ratings.forEach(rating => {
        let labels: Label[] = [];
        if (!rating.labels) return;
        for (let i of rating.labels) {
          labels.push(LABELS.find(label => label.id == i)!);
        }
        rating.labelList = labels;
      });
      return ratings;
    });
  }

}
