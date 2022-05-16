import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private readonly auth: AuthenticationService) {
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

  rememberMe: boolean = false;


  loginClicked() {
    this.auth.login({username: this.email.value, password: this.password.value, rememberMe: this.rememberMe}).then(res => {
      if(!res)
        this.authFailed = true;
    });
  }


  isLoginDisabled(): boolean {
   return this.email.invalid || this.password.invalid;
  }

}
