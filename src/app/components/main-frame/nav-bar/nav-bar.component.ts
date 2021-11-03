import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  buttons = [
    {
      path: 'home',
      label: 'Home',
      icon: 'home'
    },{
      path: 'search',
      label: 'Search',
      icon: 'search'
    },{
      path: 'ratings',
      label: 'Ratings',
      icon: 'panorama'
    }
  ];



  constructor(public readonly router: Router) { }

  ngOnInit(): void {
  }

}
