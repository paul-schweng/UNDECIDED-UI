import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {Greeting} from "../../models/greeting";
import {GreetingService} from "../../services/greeting.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.scss'],
  providers: [GreetingService]
})
export class HelloWorldComponent implements OnInit {

  isBusy: boolean = true;

  title = 'World';
  greeting: Greeting = {content: "", id: ""};


  constructor(private readonly http: HttpClient,
              public readonly translate: TranslateService,
              private readonly resourceService: GreetingService,
              private readonly toastr: ToastrService) {
  }


  ngOnInit(): void {
    this.translate.addLangs(['de','en']);
    this.translate.setDefaultLang('en');

    if(this.translate.getLangs().includes(this.translate.getBrowserLang()))
      this.translate.use(this.translate.getBrowserLang());
    else
      this.translate.use(this.translate.getDefaultLang());


    this.resourceService.getId()
      .then(greeting => this.greeting = greeting)
      .finally(() => {
        if(!this.greeting.id)
          this.toastr.error('The server did not respond!', 'Error')
        else
          this.toastr.success('The server responded!', 'Success!')

        this.isBusy = false
      });
  }


  switchLang(lang: string) {
    this.translate.use(lang);
  }

}
