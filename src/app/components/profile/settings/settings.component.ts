import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AuthenticationService} from "../../../services/authentication.service";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {ConfirmationDialogComponent} from "../../dialogs/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit{

  isBusy = false;


  constructor(public readonly translate: TranslateService,
              public readonly auth: AuthenticationService,
              private  readonly userService: UserService,
              public readonly router: Router,
              private readonly dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout();
  }

  deleteAccClicked(){
    let confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {content: 'dialog.delete.user'}
    })

    confirmDialog.beforeClosed().subscribe(confirmed => {
      if(confirmed){
        this.isBusy = true;
        this.userService.deleteUser()
          .then(() => this.logout())
          .finally(() => this.isBusy = false);
      }

    });
  }
}
