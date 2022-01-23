import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AuthenticationService} from "../../../../services/authentication.service";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'app-more-settings',
  templateUrl: './more-settings.component.html',
  styleUrls: ['./more-settings.component.scss']
})
export class MoreSettingsComponent implements OnInit {

  constructor(public readonly translate: TranslateService,
              public readonly auth: AuthenticationService,
              private  readonly userService: UserService) { }

  ngOnInit(): void {
  }

  toggleDarkTheme(){

  }

  updateUser(){
    this.auth.notifyChange();
    this.userService.updateUser(this.auth.iAmUser);
  }

}
