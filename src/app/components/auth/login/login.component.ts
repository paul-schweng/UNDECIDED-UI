import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {FormControlValidation} from "../../../services/formControlValidation";
import {AuthenticationService} from "../../../services/authentication.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private readonly auth: AuthenticationService,
              private readonly router: Router) {
  }

  ngOnInit(): void {

  }

  authFailed = false;


  password =  {
    invalid: false,
    value: ''
  };

  email = {
    invalid: false,
    value: ''
  };


  loginClicked() {
    this.auth.authenticate({username: this.email.value, password: this.password.value}).then(res => {
      if(res)
        this.router.navigateByUrl('/');
      else
        this.authFailed = true;
    });
  }


  isLoginDisabled(): boolean {
   return this.email.invalid || this.password.invalid;
  }

}
