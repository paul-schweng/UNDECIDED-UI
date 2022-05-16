import {Injectable} from "@angular/core";
import {CommunicationRequestService} from "./lib/communication-request.service";
import {User} from "../models/user";
import {HttpParams} from "@angular/common/http";
import {SearchResults} from "../models/search-results";

@Injectable({
  providedIn: 'root'
})
export class SearchService extends CommunicationRequestService<any> {

  protected readonly backendUrlExt = 'search';



  protected prepareRequestObjectParameter(reqParameter: any): HttpParams {
    return new HttpParams();
  }


  public getSearchResults(query: string): Promise<SearchResults> {
    return this.sendPostRequest<SearchResults>(this.backendUrlExt, {query: query, loadedRatings: 0}).then(results => {
      // TODO: maybe have to convert results to the specific types

      return results;
    });
  }


}
