import {Component, OnInit, Renderer2} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'UNDECIDED';
  isDarkTheme: boolean = true;

  constructor(private translate: TranslateService,
              private _renderer: Renderer2) {

  }

  ngOnInit(): void {

  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
  }


}
