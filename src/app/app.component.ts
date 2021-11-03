import {Component, OnInit, Renderer2} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {'[class.dark-theme]':'isDarkTheme'}
})
export class AppComponent implements OnInit{
  title = 'UNDECIDED';
  isDarkTheme: boolean = false;

  constructor(private translate: TranslateService,
              private _renderer: Renderer2) {

  }


  ngOnInit(): void {
    this.initTranslateService();
  }


  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
  }


  private initTranslateService(): void {
    this.translate.addLangs(['de','en']);
    this.translate.setDefaultLang('en');

    if(this.translate.getLangs().includes(this.translate.getBrowserLang()))
      this.translate.use(this.translate.getBrowserLang());
    else
      this.translate.use(this.translate.getDefaultLang());
  }


}
