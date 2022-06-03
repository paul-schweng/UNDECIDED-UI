import { Injectable } from '@angular/core';
import {CommunicationRequestService} from "./lib/communication-request.service";
import {HttpParams} from "@angular/common/http";
import {Rating} from "../models/rating";
import {SampleProduct} from "./SampleData";
import {Converter} from "./converter";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class RatingService extends CommunicationRequestService<any>{
  protected readonly backendUrlExt = 'rating';

  protected prepareRequestObjectParameter(reqParameter: any): HttpParams {
    if(reqParameter.filter)
      return new HttpParams()
        .set('filter', reqParameter.filter)
        .set("id", reqParameter.id)
        .set('i', reqParameter.i)
        .set("userID", reqParameter.userID);
    if(reqParameter.id)
      return new HttpParams().set('id', reqParameter.id);
    return new HttpParams();
  }

  public getRating(id: string): Promise<Rating> {
    return super.sendGetRequest<Rating>(this.backendUrlExt, {id: id})
      .then(rating => {
        this.loadImages(rating);
        rating = Converter.convertDeletedUser(rating);
        return Converter.convertLabel<Rating>(rating);
      });
  }

  public postRating(rating: Rating): Promise<Rating> {
    let images = rating.images || [];
    let ratingWithoutImages: Rating = JSON.parse(JSON.stringify(rating));
    delete ratingWithoutImages['images'];
    //convert actual labels to numbers
    ratingWithoutImages.labels = ratingWithoutImages.labelList?.map(label => label.id);
    delete ratingWithoutImages['labelList'];

    return super.sendPostRequest<Rating>(this.backendUrlExt, ratingWithoutImages)
      .then(async resRating => {
        if(rating.images)
          await this.imageService.postRatingImages(resRating, images);
        this.loadImages(rating);
        return Converter.convertLabel(resRating);
      });
  }

  public editRating(rating: Rating): Promise<Rating> {
    let images = rating.images || [];
    let ratingWithoutImages: Rating = JSON.parse(JSON.stringify(rating));
    delete ratingWithoutImages['images'];
    //convert actual labels to numbers
    ratingWithoutImages.labels = ratingWithoutImages.labelList?.map(label => label.id);
    delete ratingWithoutImages['labelList'];

    return super.sendPutRequest<Rating>(this.backendUrlExt, ratingWithoutImages)
      .then(async resRating => {
        if(images)
          await this.imageService.postRatingImages(resRating, images);
        this.loadImages(rating);
        return Converter.convertLabel(resRating);
      });
  }

  public getRatingsOfFollowing(lastRating: string): Promise<Rating[]> {
    return super.sendGetRequest<Rating[]>(this.backendUrlExt + '/home', {id: lastRating}).then(ratingList => {
      this.loadImagesArray(ratingList);
      ratingList = Converter.convertDeletedUser(ratingList);
      return Converter.convertLabel(ratingList);
    });
  }



  public getMyRatings(filter: string, lastRating: string, len: number, userID: string): Promise<Rating[]> {
    return super.sendGetRequest<Rating[]>(this.backendUrlExt + 's', {filter: filter, id: lastRating, i: len, userID: userID}).then(ratingList => {
        this.loadImagesArray(ratingList);
        ratingList = Converter.convertDeletedUser(ratingList);
        return Converter.convertLabel(ratingList);
    });
  }

  deleteRating(id: string): Promise<Rating> {
    return super.sendDeleteRequest(this.backendUrlExt, {id: id});
  }

  likeRating(id: string): Promise<any> {
    return super.sendGetRequest(this.backendUrlExt + `/like/${id}`, undefined, undefined, true);
  }

  removeLikeRating(id: string): Promise<any> {
    return super.sendGetRequest(this.backendUrlExt + `/dislike/${id}`, undefined, undefined, true);
  }

  isRatingLiked(id: string): Promise<boolean> {
    return super.sendGetRequest<any>(this.backendUrlExt + `/liked/${id}`).then(liked => {
      return liked.liked;
    });
  }

  loadImagesArray(ratings: Rating[]){
    ratings.forEach(rating => {
      this.loadImages(rating)
    });
  }


  loadImages(rating: Rating) {
    if (rating.user) {
      rating.user.loadImage = new User().loadImage;
      rating.user?.loadImage();
    }

    rating.friends?.forEach(friend => {
      friend.loadImage = new User().loadImage;
      friend.loadImage();
    });
  }

}
