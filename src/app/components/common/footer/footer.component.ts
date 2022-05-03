import { Component, OnInit } from '@angular/core';
import {VERSION_DATA} from "../../../../main";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  versionData = VERSION_DATA[0];

  constructor() { }

  ngOnInit(): void {
  }

}
