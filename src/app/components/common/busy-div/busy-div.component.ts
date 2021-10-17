import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';

@Component({
  selector: 'busy-div',
  templateUrl: './busy-div.component.html',
  styleUrls: ['./busy-div.component.scss'],
  providers: []
})
export class BusyDivComponent implements OnDestroy, OnChanges {
  @Input() busy: boolean = false;
  @Input() showText: boolean = true;
  @Input() maxHeight: boolean = false;
  @Input() busyText: string = "loading";
  @Input() diameter?: number;
  @Input() styleClass?: string;
  public busyPromise!: Promise<any>;
  private refreshInterval: any;

  ngOnDestroy(): void {
    clearInterval(this.refreshInterval);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.busy) {
      this.busy = changes.busy.currentValue;

      if (this.busy) {
        this.busyPromise = new Promise((resolve, reject) => {
          this.refreshInterval = setInterval(() => {
            if (!this.busy) {
              clearInterval(this.refreshInterval);
              resolve(null);
            }
          }, 250);
        });
      }
    }
  }
}
