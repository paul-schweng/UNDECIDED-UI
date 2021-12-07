import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {clone} from "../../services/clone";
import {SampleRating} from "../../services/SampleData";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ratings = new Array(5).fill(clone(SampleRating));

  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout();
  }

}
