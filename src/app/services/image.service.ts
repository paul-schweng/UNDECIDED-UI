import {Injectable} from "@angular/core";
import {Rating} from "../models/rating";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private backendUrl = `../${environment.backendPrefix}/img/`;

  constructor(private http: HttpClient) {

  }


  public postRatingImages(rating: Rating){
    console.log("image upload...");


    rating.images!.forEach((img, i) => {
      if('string' != typeof img){

        const uploadData = new FormData();
        uploadData.append('image', img.file, img.file.name);

        let params = new HttpParams()
          .set('rating', rating.id)
          .set('index', i);

        this.http.post(this.backendUrl + 'rating', uploadData, {
          params: params,
          reportProgress: true,
          observe: 'events'
      })
      .subscribe(event => {
          console.log(event); // handle event here
        });


      }
    })

  }


}
