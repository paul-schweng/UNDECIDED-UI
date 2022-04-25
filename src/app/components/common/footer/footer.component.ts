import { Component, OnInit } from '@angular/core';
import {VERSION_DETAIL, VERSION_NUMBER} from "../../../../main";

@Component({
  selector: 'footer-login',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  version_number = VERSION_NUMBER;
  version_detail = VERSION_DETAIL;

  constructor() { }

  ngOnInit(): void {
  }

}
