import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {Greeting} from "../../models/greeting";
import {GreetingService} from "../../services/greeting.service";

@Component({
  selector: 'hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.scss'],
  providers: [GreetingService]
})
export class HelloWorldComponent implements OnInit {

  isBusy: boolean = true;

  title = 'Demo';
  greeting: Greeting = {content: "", id: ""};


  constructor(private readonly http: HttpClient,
              public readonly translate: TranslateService,
              private readonly resourceService: GreetingService) {

    resourceService.getId().then(greeting => this.greeting = greeting)
      .finally(() => this.isBusy = false);

  }


  ngOnInit(): void {
    this.translate.addLangs(['de','en']);
    this.translate.setDefaultLang('en');

    if(this.translate.getLangs().includes(this.translate.getBrowserLang()))
      this.translate.use(this.translate.getBrowserLang());
    else
      this.translate.use(this.translate.getDefaultLang());
  }


  switchLang(lang: string) {
    this.translate.use(lang);
  }

}
