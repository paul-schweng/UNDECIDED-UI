import {Injectable} from "@angular/core";
import {CommunicationRequestService} from "./lib/communication-request.service";
import {HttpParams} from "@angular/common/http";
import {SearchResults} from "../models/search-results";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService extends CommunicationRequestService<any> {

  protected readonly backendUrlExt = 'search';

  private _filters: string[] = [];
  private _filters$ = new BehaviorSubject(this._filters);

  set filters(value: any) {
    this._filters = value;
    this._filters$.next(this._filters);
  }
  get filters() {
    return this._filters$.asObservable();
  }



  protected prepareRequestObjectParameter(reqParameter: any): HttpParams {
    return new HttpParams();
  }


  public getSearchResults(query: string, loadedRatings: number, loadedUsers: number): Promise<SearchResults> {
    if(query == '')
      return new Promise((resolve, reject) => reject());

    return this.sendPostRequest<SearchResults>(this.backendUrlExt, {
      query: query,
      loadedRatings: loadedRatings,
      loadedUsers: loadedUsers,
      filters: this._filters
    }).then(results => {
      // TODO: maybe have to convert results to the specific types

      return results;
    });
  }


}
