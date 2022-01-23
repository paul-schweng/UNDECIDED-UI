import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MatRadioChange} from "@angular/material/radio";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'auth-navbar',
  templateUrl: './auth-navbar.component.html',
  styleUrls: ['./auth-navbar.component.scss']
})
export class AuthNavbarComponent implements OnInit {

  constructor(public readonly router: Router,
              public readonly translate: TranslateService) { }

  ngOnInit(): void {
  }

  changeLang(event: MatRadioChange) {
    this.translate.use(event.value)
  }
}
