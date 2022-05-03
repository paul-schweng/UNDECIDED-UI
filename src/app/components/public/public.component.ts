import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  constructor(private readonly auth: AuthenticationService) {
    this.isAuthenticated = this.auth.authenticated;
  }

  isAuthenticated: boolean;

  ngOnInit(): void {

  }

}
