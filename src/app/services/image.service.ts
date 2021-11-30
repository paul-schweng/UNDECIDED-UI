import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {WebcamImage} from "ngx-webcam";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private backendUrl = `../${environment.backendPrefix}/img/`;

  constructor(private http: HttpClient) {

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


}
