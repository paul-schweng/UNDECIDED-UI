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
  toggleTheme = new FormControl(false);

  constructor(private translate: TranslateService,
              private _renderer: Renderer2) {

  }

  ngOnInit(): void {
    this.toggleTheme.valueChanges.subscribe((toggleValue: boolean) => {
      if (toggleValue) {
        this._renderer.addClass(document.body, 'dark-theme');
      } else {
        this._renderer.removeClass(document.body, 'dark-theme');
      }
    });
  }


}
