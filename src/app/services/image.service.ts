import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {User} from "../models/user";
import {NotificationService} from "./notification.service";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private backendUrl = `../${environment.backendPrefix}/img/`;

  constructor(private http: HttpClient,
              private notification: NotificationService) {

  }


  public postRatingImages(id: string, images: any[]){
    console.log("image upload...");


    images!.forEach((img, i) => {
      if('string' != typeof img){

        const uploadData = new FormData();

        if(img.file)
          uploadData.append('image', img.file);
        else
          uploadData.append('image', ImageService.base64ToFile(img.base64));


        let params = new HttpParams()
          .set('rating', id)
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

  static base64ToFile(base64: string): File {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], 'webcam.jpeg', { type: mime })
  }


  postUserImage(img: any): Promise<User> {
    console.log("image upload...");
    const uploadData = new FormData();

    if(img.file)
      uploadData.append('image', img.file);
    else
      uploadData.append('image', ImageService.base64ToFile(img.base64));

    return new Promise<User>((resolve, reject) => {
      this.http.post<User>(this.backendUrl + 'user', uploadData).subscribe(event => {
          console.log(event); // handle event here
          resolve(event);
        }, error => {
        this.notification.handleHttpError(error);
        reject(error);
      });
    })

  }


}
