import { Injectable } from '@angular/core';
import {CommunicationRequestService} from "./lib/communication-request.service";
import {HttpParams} from "@angular/common/http";
import {Rating} from "../models/rating";
import {LABELS} from "../models/label";
import {SampleProduct} from "./SampleData";
import {Converter} from "./converter";

@Injectable({
  providedIn: 'root'
})
export class RatingService extends CommunicationRequestService<any>{
  protected readonly backendUrlExt = 'rating';

  protected prepareRequestObjectParameter(reqParameter: any): HttpParams {
    if(reqParameter.filter)
      return new HttpParams().set('filter', reqParameter.filter);
    if(reqParameter.id)
      return new HttpParams().set('id', reqParameter.id);
    return new HttpParams();
  }

  public getRating(id: string): Promise<Rating> {
    return super.sendGetRequest<Rating>(this.backendUrlExt, {id: id})
      .then(rating => {
        return Converter.convertLabel<Rating>(rating);
      });
  }

  public postRating(rating: Rating){
    let images = rating.images || [];
    let ratingWithoutImages: Rating = JSON.parse(JSON.stringify(rating));
    delete ratingWithoutImages['images'];
    //convert actual labels to numbers
    ratingWithoutImages.labels = ratingWithoutImages.labelList?.map(label => label.id);
    delete ratingWithoutImages['labelList'];

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
    //convert actual labels to numbers
    ratingWithoutImages.labels = ratingWithoutImages.labelList?.map(label => label.id);
    delete ratingWithoutImages['labelList'];

    return super.sendPutRequest<Rating>(this.backendUrlExt, ratingWithoutImages)
      .then(resRating => {
        if(images)
          this.imageService.postRatingImages(resRating.id, images);
      });
  }



  public getMyRatings(filter: string): Promise<Rating[]> {
    return super.sendGetRequest<Rating[]>(this.backendUrlExt + 's', {filter: filter}).then(ratingList => {
        return Converter.convertLabel(ratingList);
    }, //TODO: delete this mockdata from here
      () => {
      let ratingList: Rating[] = [{
        product: SampleProduct,
        stars: 4.5,
        id: 'dfas3',
        labels: [0,4,8,2],
        images: []
      }]
      //convert label numbers to actual labels
      let ratings = ratingList || [];
      ratings.forEach(rating => {
        rating.labelList = rating.labels?.flatMap(i => LABELS.find(label => label.id == i) || [] );
        rating.labelList?.sort((label1,label2) => label1.id - label2.id);
        delete rating['labels'];
      });
      return ratings;
    } //until here
    );
  }

}
