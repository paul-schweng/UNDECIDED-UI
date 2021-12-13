import {Inject, Injectable, Injector} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private httpErrorPath = "httpError.header.error";

  constructor(@Inject(Injector) private injector: Injector,
              private readonly translate: TranslateService,
              private readonly router: Router) { }

  private get toastr(): ToastrService {
    return this.injector.get(ToastrService);
  }

  public error(header: string, msg: string) {
    this.toastr.error(this.translate.instant(msg), this.translate.instant(header),{enableHtml: true});
  }

  public handleHttpError(error: any): void {
    //let notificationSettings: Partial<IndividualConfig> = {timeOut: 3000};

    if (!error) {
      console.info('[BaseCommunicationService] - An undefined error occurred while calling backend');
      this.error(this.httpErrorPath, "httpError.msg.error");
    }
    else if (error.status === 400) {
      console.info('[BaseCommunicationService] - Bad request was sent to backend');
      this.error(this.httpErrorPath, "httpError.msg.badRequest");
    } else if (error.status === 401) {
      console.info('[BaseCommunicationService] - Unauthorized call to backend. Forwarding to unauthorized-page');
      this.router.navigate(['/login']);
    } else if (error.status === 403) {
      console.info('[BaseCommunicationService] - Accessing resource forbidden');
      // this.notification.warn("httpError.header.forbidden", "httpError.msg.forbidden");
    } else if (error.status === 404) {
      console.info('[BaseCommunicationService] - Unknown backend call');
      if (error.hasOwnProperty("error") && error.error !== null){
        console.info('[BaseCommunicationService] - error msg: ', error.error);
        this.error(this.httpErrorPath, "httpError.msg.error");
      }
    } else {
      console.info( '[BaseCommunicationService] - An error occurred while calling backend:\n', error.message);
      this.error(this.httpErrorPath, "httpError.msg.error");
    }
  }

}
