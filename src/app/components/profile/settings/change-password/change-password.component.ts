import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AuthenticationService} from "../../../../services/authentication.service";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  wrongPwd: boolean = false;

  constructor(public readonly translate: TranslateService,
              public readonly auth: AuthenticationService,
              private  readonly userService: UserService) { }

  ngOnInit(): void {
  }

  newPwdClicked(currentPwd: string, newPwd: string) {
    this.userService.changePassword(currentPwd, newPwd).then(res => {
      console.log(res)
      if(!res)
        this.wrongPwd = true;
      else
        console.log('successfully changed password!')
    });
  }

  updateUser(){
    this.auth.notifyChange();
    this.userService.updateUser(this.auth.iAmUser);
  }

}
