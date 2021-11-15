import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'input-email',
  templateUrl: './input-email.component.html',
  styleUrls: ['./input-email.component.scss']
})
export class InputEmailComponent implements OnInit{

  @Output() value = new EventEmitter<string>();
  @Output() invalid = new EventEmitter<boolean>();
  @Input() label?: string;

  //TODO: uncomment Validator
  formControl: FormControl = new FormControl('',[Validators.required, /* Validators.email */]);


  constructor(public readonly translate: TranslateService) {
  }

  getErrorMessage() {
    if (this.formControl.hasError('required')) {
      return this.translate.instant('basics.required');
    }

    return this.formControl.hasError('email') ? 'Not a valid email' : '';
  }

  ngOnInit(): void {
    this.invalid.emit(!this.formControl.value);
    this.formControl.statusChanges.subscribe(() => this.invalid.emit(this.formControl.invalid));
    this.formControl.valueChanges.subscribe(change => {
      this.value.emit(change);
    });
  }

}
