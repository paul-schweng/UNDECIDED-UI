import {Injectable} from "@angular/core";
import {CommunicationRequestService} from "./lib/communication-request.service";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService extends CommunicationRequestService<any> {
  protected readonly backendUrlExt = 'autocomplete';

  protected prepareRequestObjectParameter(reqParameter: any): HttpParams {
    return new HttpParams();
  }

  public getTags(input: string): Promise<string[]>{
    return super.sendPostRequest(this.backendUrlExt + '/tags', {input: input});
  }
}
