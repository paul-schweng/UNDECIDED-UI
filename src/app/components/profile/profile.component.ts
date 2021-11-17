import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {User} from "../../models/user";
import {AuthenticationService} from "../../services/authentication.service";
import {SampleUser} from "../../services/SampleData";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  iAmUser: User;

  constructor(private translate: TranslateService,
              private readonly auth: AuthenticationService,
              private readonly router: Router) {

    //TODO: remove SampleUser
    this.iAmUser = this.auth.iAmUser || SampleUser;
  }

  ngOnInit(): void {
    this.edit = this.router.url.includes('edit');
    this.router.events.subscribe((val) => {
      this.edit = (val as NavigationEnd).url?.includes('edit');
    });
  }

  edit: boolean = false;


}
