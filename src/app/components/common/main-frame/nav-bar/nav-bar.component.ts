import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../../services/authentication.service";
import {User} from "../../../../models/user";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  iAmUser: User;


  constructor(public readonly router: Router,
              private readonly auth: AuthenticationService) {

    this.iAmUser = auth.iAmUser;
  }

  ngOnInit(): void {
  }

}
