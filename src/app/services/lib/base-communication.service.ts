import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {Subject, Subscription} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {NotificationService} from "../notification.service";
import {ImageService} from "../image.service";


@Injectable({
  providedIn: 'root'
})
export abstract class BaseCommunicationService {
  constructor(protected notification: NotificationService,
              protected imageService: ImageService,
              protected http: HttpClient,
              protected router: Router) {
  }


  protected backendUrl = `../${environment.backendPrefix}/`;
  protected callReplay: Subject<boolean> = new Subject<boolean>();
  protected headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private subscriptionMap = new Map();


  public interruptBackendCalls(): void {
    this.callReplay.next(true);
    this.callReplay.complete();
    this.callReplay = new Subject<boolean>();
  }


  protected executeSendGetRequest<TResult>(url: string, httpReqParam: HttpParams, httpHeaders?: HttpHeaders, allowNullResult: boolean = false, subscriptionURL: string = ""): Promise<TResult> {
    this.checkSubscriptions(subscriptionURL);
    return new Promise<TResult>((resolve, reject) => {
      let subs: Subscription = this.http.get<TResult>(this.backendUrl + url, {params: httpReqParam, headers: (httpHeaders || BaseCommunicationService.prepareRequestHeaders())})
        .pipe(takeUntil(this.callReplay))
        .subscribe(response => {
            if (!allowNullResult && !response) {
              reject();
              return;
            }
            resolve(response);
          }, error => {

            reject(error);
          }
        );
      if(subscriptionURL)
        this.subscriptionMap.set(subscriptionURL, subs);
    });
  }

  protected executeSendPostRequest<TResult>(url: string, content: any, httpReqParam?: HttpParams): Promise<TResult> {
    if (!httpReqParam) httpReqParam = new HttpParams();

    return new Promise<TResult>((resolve, reject) => {
      this.http.post<TResult>(this.backendUrl + url, content, {params: httpReqParam, headers: BaseCommunicationService.prepareRequestHeaders()})
        .pipe(takeUntil(this.callReplay))
        .subscribe(response => {
            resolve(response);
          }, error => {

            reject(error);
          }
        );
    });
  }

  protected executeSendPutRequest<TResult>(url: string, content: any, httpReqParam?: HttpParams): Promise<TResult> {
    if (!httpReqParam) httpReqParam = new HttpParams();

    return new Promise<TResult>((resolve, reject) => {
      this.http.put<TResult>(this.backendUrl + url, content, {params: httpReqParam, headers: BaseCommunicationService.prepareRequestHeaders()})
        .pipe(takeUntil(this.callReplay))
        .subscribe(response => {
            resolve(response);
          }, error => {

            reject(error);
          }
        );
    });
  }

  protected executeSendDeleteRequest<TResult>(url: string, httpReqParam?: HttpParams): Promise<TResult> {
    if (!httpReqParam) httpReqParam = new HttpParams();

    return new Promise<TResult>((resolve, reject) => {
      this.http.delete<TResult>(this.backendUrl + url, {params: httpReqParam, headers: BaseCommunicationService.prepareRequestHeaders()})
        .pipe(takeUntil(this.callReplay))
        .subscribe(response => {
            resolve(response);
          }, error => {

            reject(error);
          }
        );
    });
  }

  private checkSubscriptions(subscriptionURL: string): void {
    if(subscriptionURL && this.subscriptionMap.has(subscriptionURL)) {
      let sub: Subscription = this.subscriptionMap.get(subscriptionURL);
      sub.unsubscribe();
      this.subscriptionMap.delete(subscriptionURL);
    }
  }

  private static prepareRequestHeaders(headers?: HttpHeaders): HttpHeaders {
    if (headers == null) headers = new HttpHeaders();

    //add headers here

    return headers;
  }
}
