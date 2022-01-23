import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../../services/user.service";
import {AuthenticationService} from "../../../../services/authentication.service";

@Component({
  selector: 'change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent implements OnInit {

  wrongEmail: boolean = false;

  constructor(private  readonly userService: UserService,
              public readonly auth: AuthenticationService) { }

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

  updateUser(){
    this.auth.notifyChange();
    this.userService.updateUser(this.auth.iAmUser);
  }
}
