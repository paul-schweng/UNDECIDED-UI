import { Component, OnInit } from '@angular/core';
import {VERSION_DATA} from "../../../../../main";

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.scss']
})
export class VersionComponent implements OnInit {

  versionData = VERSION_DATA;
  columns: string[] = Object.keys(this.versionData[0]);

  constructor() { }

  ngOnInit(): void {
    console.log(this.columns)
  }

}
