import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AuthenticationService} from "../../../services/authentication.service";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit{


  constructor(public readonly translate: TranslateService,
              public readonly auth: AuthenticationService,
              private  readonly userService: UserService,
              public readonly router: Router) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout();
  }
}
