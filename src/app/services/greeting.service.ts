import { Injectable } from '@angular/core';
import {CommunicationRequestService} from "./communication-request.service";
import {Greeting} from "../models/greeting";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GreetingService extends CommunicationRequestService<Greeting>{
  protected readonly backendUrlExt = 'greeting';

  public getId(): Promise<Greeting> {
    return super.sendGetRequest(this.backendUrlExt);
  }

  protected prepareRequestObjectParameter(reqParameter: Greeting): HttpParams {
    return new HttpParams();
  }

}
