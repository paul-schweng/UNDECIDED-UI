import { Injectable } from '@angular/core';
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {BaseCommunicationService} from "./base-communication.service";

@Injectable({
  providedIn: 'root'
})
export abstract class CommunicationRequestService<TParamInterface> extends BaseCommunicationService {
  private handleHttpParameters(reqParameter?: TParamInterface): HttpParams {
    if (!reqParameter) return new HttpParams();
    return this.prepareRequestObjectParameter(reqParameter);
  }


  private errorLogging(error: any): void {
    console.error('[CommunicationRequestService] - An error occurred while preparing backend call', error);
    //this.notification.error("httpError.header.error", "httpError.msg.error", {timeOut: 3000});
  }

  protected abstract prepareRequestObjectParameter(reqParameter: TParamInterface): HttpParams;

  public sendGetRequest<TResult>(url: string, reqParameter?: TParamInterface, reqHeader?: HttpHeaders, allowNullResult: boolean = false, subscriptionURL: string = ""): Promise<TResult> {
    try {
      return super.executeSendGetRequest(url, this.handleHttpParameters(reqParameter), reqHeader, allowNullResult, subscriptionURL);
    } catch (error) {
      this.errorLogging(error);
      return Promise.reject(error);
    }
  }

  public sendPutRequest<TResult>(url: string, content: any, reqParameter?: TParamInterface): Promise<TResult> {
    try {
      return super.executeSendPutRequest(url, content, this.handleHttpParameters(reqParameter));
    } catch (error) {
      this.errorLogging(error);
      return Promise.reject(error);
    }
  }

  public sendPostRequest<TResult>(url: string, content: any, reqParameter?: TParamInterface): Promise<TResult> {
    try {
      return super.executeSendPostRequest(url, content, this.handleHttpParameters(reqParameter));
    } catch (error) {
      this.errorLogging(error);
      return Promise.reject(error);
    }
  }

  public sendDeleteRequest<TResult>(url: string, reqParameter?: TParamInterface): Promise<TResult> {
    try {
      return super.executeSendDeleteRequest(url, this.handleHttpParameters(reqParameter));
    } catch (error) {
      this.errorLogging(error);
      return Promise.reject(error);
    }
  }
}
