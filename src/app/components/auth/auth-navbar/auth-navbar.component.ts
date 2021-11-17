import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'auth-navbar',
  templateUrl: './auth-navbar.component.html',
  styleUrls: ['./auth-navbar.component.scss']
})
export class AuthNavbarComponent implements OnInit {

  constructor(public readonly router: Router) { }

  ngOnInit(): void {
  }

}
