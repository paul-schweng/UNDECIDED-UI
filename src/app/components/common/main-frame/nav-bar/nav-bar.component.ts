import {Component, HostListener, OnInit} from '@angular/core';
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
  navbarfixed: boolean = false;

  constructor(public readonly router: Router,
              private readonly auth: AuthenticationService) {

    this.iAmUser = auth.iAmUser;
  }

  ngOnInit(): void {
  }

  @HostListener('window:scroll',['$event']) onscroll(){
    this.navbarfixed = window.scrollY > 150;
  }

  onActivate() {
    if (this.navbarfixed){
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }

  getProfileImage() {
    return `/api/img/user/${this.auth.iAmUser.id}`;
  }
}
