import {Directive, EventEmitter, Output} from "@angular/core";
import {FormControl} from "@angular/forms";

@Directive()
export abstract class BaseInput{

  @Output() value = new EventEmitter<string>();
  @Output() invalid = new EventEmitter<boolean>();

  formControl: FormControl = new FormControl();


  protected constructor() {
    console.log("here")
    this.formControl.statusChanges.subscribe(() => this.invalid.emit(this.formControl.invalid));
    this.formControl.valueChanges.subscribe(change => {
      this.value.emit(change);
      console.log(change, 'ui');
    });
  }

}
