import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AuthenticationService} from "./services/authentication.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {'[class.dark-theme]':'isDarkTheme'}
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'UNDECIDED';
  isDarkTheme: boolean = false;
  userSub: Subscription;

  constructor(private translate: TranslateService,
              private readonly renderer: Renderer2,
              private readonly auth: AuthenticationService) {

    this.userSub = this.auth.onUserChanges.subscribe(() => this.init())
  }

  ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }

  init(){
    this.manageDarkTheme();
    this.initTranslateService();
  }

  ngOnInit(): void {
    this.init();
  }



  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    this.manageDarkTheme()
  }

  private manageDarkTheme(){
    if(this.auth.iAmUser?.isDarkTheme)
      this.renderer.addClass(document.body, 'dark-theme');
    else
      this.renderer.removeClass(document.body, 'dark-theme');
  }


  private initTranslateService(): void {
    this.translate.addLangs(['de','en']);
    this.translate.setDefaultLang('en');

    if(this.translate.getLangs().includes(this.auth.iAmUser?.language || '-1'))
      this.translate.use(this.auth.iAmUser!.language!);
    else if(this.translate.getLangs().includes(this.translate.getBrowserLang()))
      this.translate.use(this.translate.getBrowserLang());
    else
      this.translate.use(this.translate.getDefaultLang());
  }


}
