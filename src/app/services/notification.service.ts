import {Inject, Injectable, Injector} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(@Inject(Injector) private injector: Injector,
              private readonly translate: TranslateService) { }

  private get toastr(): ToastrService {
    return this.injector.get(ToastrService);
  }

  public error(header: string, msg: string) {
    this.toastr.error(this.translate.instant(msg), this.translate.instant(header));
  }
}
