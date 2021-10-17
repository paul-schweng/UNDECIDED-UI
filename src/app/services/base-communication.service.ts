import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {Subject, Subscription} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
@Injectable()
export abstract class BaseCommunicationService {
  constructor(//protected notification: NotificationService,
              protected http: HttpClient,
              protected router: Router) {
  }

  protected backendUrl = `../${environment.backendPrefix}/`;
  protected callReplay: Subject<boolean> = new Subject<boolean>();
  protected headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private subscriptionMap = new Map();

  private readonly defaultErrorPath: string = "httpError.header.error";

  public interruptBackendCalls(): void {
    this.callReplay.next(true);
    this.callReplay.complete();
    this.callReplay = new Subject<boolean>();
  }


  protected handleHttpError(error: any): void {
    // let notificationSettings: Partial<IndividualConfig> = {timeOut: 3000};

    if (!error) {
      console.info('[BaseCommunicationService] - An undefined error occurred while calling backend');
      //this.notification.error(this.defaultErrorPath, "httpError.msg.error", notificationSettings);
    }
    else if (error.status === 400) {
      console.info('[BaseCommunicationService] - Bad request was sent to backend');
      //this.notification.error(this.defaultErrorPath, "httpError.msg.badRequest");
    } else if (error.status === 401) {
      console.info('[BaseCommunicationService] - Unauthorized call to backend. Forwarding to unauthorized-page');
      this.router.navigate(['/unauthorized']);
    } else if (error.status === 403) {
      console.info('[BaseCommunicationService] - Accessing resource forbidden');
      //this.notification.warn("httpError.header.forbidden", "httpError.msg.forbidden", notificationSettings);
    } else if (error.status === 404) {
      console.info('[BaseCommunicationService] - Unknown backend call');
      if (error.hasOwnProperty("error") && error.error !== null)
        console.info('[BaseCommunicationService] - error msg: ', error.error);
    } else {
      console.info( '[BaseCommunicationService] - An error occurred while calling backend:\n', error.message);
      //this.notification.error(this.defaultErrorPath, "httpError.msg.error", notificationSettings);
    }
  }




  protected executeSendGetRequest<TResult>(url: string, httpReqParam: HttpParams, allowNullResult: boolean = false, subscriptionURL: string = ""): Promise<TResult> {
    this.checkSubscriptions(subscriptionURL);
    return new Promise<TResult>((resolve, reject) => {
      let subs: Subscription = this.http.get<TResult>(this.backendUrl + url, {params: httpReqParam, headers: BaseCommunicationService.prepareRequestHeaders()})
        .pipe(takeUntil(this.callReplay))
        .subscribe(response => {
            if (!allowNullResult && !response) {
              reject();
              return;
            }
            resolve(response);
          }, error => {
            this.handleHttpError(error);
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
            //this.handleHttpError(error);
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
            //this.handleHttpError(error);
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
            //this.handleHttpError(error);
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
