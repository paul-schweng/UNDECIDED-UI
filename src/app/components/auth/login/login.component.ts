import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {FormControlValidation} from "../../../services/formControlValidation";
import {AuthenticationService} from "../../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public readonly translate: TranslateService,
              private readonly auth: AuthenticationService,
              private readonly router: Router) {
  }

  ngOnInit(): void {
  }

  hide = true;
  authFailed = false;


  email = new FormControl('', [Validators.required, /* Validators.email */]);
  password =  new FormControl('', [Validators.required]);




  getErrorMessage() {
    if (this.email.hasError('required')) {
      return this.translate.instant('basics.required');
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  openForgotPassword() {
    console.log("opens dialog")
  }

  loginClicked() {
    this.auth.authenticate({username: this.email.value, password: this.password.value}).then(res => {
      if(res)
        this.router.navigateByUrl('/');
      else
        this.authFailed = true;
    });
  }

  isLoginDisabled(): boolean {
   return FormControlValidation.hasFormValidationErrors(this.email, this.password);
  }

}
