import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public readonly translate: TranslateService) { }

  ngOnInit(): void {
  }

  hide = true;

  email = new FormControl('', [Validators.required, Validators.email]);

  password = new FormControl('', [Validators.required]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return this.translate.instant('basics.required');
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  openForgotPassword() {
    console.log("opens dialog")
  }

}
