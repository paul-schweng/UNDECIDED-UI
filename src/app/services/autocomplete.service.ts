import {Injectable} from "@angular/core";
import {CommunicationRequestService} from "./lib/communication-request.service";
import {HttpParams} from "@angular/common/http";
import {Product} from "../models/product";
import {Converter} from "./converter";
import {SampleProduct} from "./SampleData";
import {clone} from "./clone";

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService extends CommunicationRequestService<any> {
  protected readonly backendUrlExt = 'autocomplete';

  protected prepareRequestObjectParameter(reqParameter: any): HttpParams {
    return new HttpParams();
  }

  public getType(input: string): Promise<string[]>{
    return super.sendPostRequest(this.backendUrlExt + '/type', {input: input});
  }

  public getProduct(input: string): Promise<Product[]>{
    return super.sendPostRequest<Product[]>(this.backendUrlExt + '/product', {input: input})
      .then(productList => {
        return Converter.convertLabel(productList);
      }
      //TODO: remove this line
      ,() =>  {return Converter.convertLabel(clone([SampleProduct]));}
      );
  }

  public getBrand(input: string): Promise<string[]>{
    return super.sendPostRequest(this.backendUrlExt + '/brand', {input: input});
  }

  public getLocation(input: string): Promise<Location[]>{
    return super.sendPostRequest(this.backendUrlExt + '/location', {input: input});
  }
}
