import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AuthenticationService} from "../../../services/authentication.service";
import {UserService} from "../../../services/user.service";


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit{

  wrongEmail: boolean = false;


  constructor(public readonly translate: TranslateService,
              public readonly auth: AuthenticationService,
              private  readonly userService: UserService) {
  }

  ngOnInit(): void {
  }

  newEmailClicked(currentEmail: string, newEmail: string) {
      this.userService.changeEmail(currentEmail, newEmail).then(res => {
        console.log(res)
        if(!res)
          this.wrongEmail = true;
        else
          console.log('successfully changed email!')
      });
  }

  newPwdClicked(currentEmail: string, newEmail: string) {
    this.userService.changePassword(currentEmail, newEmail).then(res => {
      console.log(res)
      if(!res)
        this.wrongEmail = true;
      else
        console.log('successfully changed password!')
    });
  }

  updateUser(){
    this.auth.notifyChange();
    this.userService.updateUser(this.auth.iAmUser);
  }

  toggleDarkTheme(){

  }
}
