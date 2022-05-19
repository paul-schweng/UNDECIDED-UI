import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[data]'
})
export class NgTemplateDataDirective {

  @Input() set data(data: any){
    if(!this.el.nativeElement.attributes)
      this.el.nativeElement.attributes = {};

    this.el.nativeElement.attributes.data = data;
  }

  constructor(private el: ElementRef) {

  }

}
