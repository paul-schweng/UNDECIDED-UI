import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";


@Component({
  selector: 'input-pwd',
  templateUrl: './input-pwd.component.html',
  styleUrls: ['./input-pwd.component.scss']
})
export class InputPwdComponent implements OnInit {



  @Output() value = new EventEmitter<string>();
  @Output() invalid = new EventEmitter<boolean>();
  @Input() type: 'enter' | 'new' | 'repeat' = 'enter';
  @Input('repeatedPwd') set _repeatedPwd(pwd: string) {
    this.repeatedPwd = pwd;
    this.formControl.updateValueAndValidity();
  };

  repeatedPwd: string = '';
  forgotPwd: boolean = true;
  label: string = 'auth.enterPwd';
  hide = true;
  formControl: FormControl = new FormControl('',[Validators.required]);
  extraValidators?: ValidatorFn[];

  securePasswordRegEx = [
    {
      name: 'auth.securePwd.length',
      regex: '^.{8,}$'
    },{
      name: 'auth.securePwd.lowercase',
      regex: '(.*[a-z].*)'
    },{
      name: 'auth.securePwd.uppercase',
      regex: '(.*[A-Z].*)'
    },{
      name: 'auth.securePwd.number',
      regex: '(.*\\d.*)'
    },
  ]



  constructor() {
  }


  openForgotPassword() {
    console.log("opens dialog")
  }


  ngOnInit(): void {
    switch (this.type){
      case 'enter': break;

      case 'new':
        this.securePasswordRegEx.forEach( p => this.formControl.addValidators(Validators.pattern(p.regex)) );
        this.forgotPwd = false;
        this.label ='auth.enterPwd';
        this.formControl.addValidators(this.repeatedPwdValidator());
        break;

      case 'repeat':
        this.label = 'auth.newPwd';
        this.forgotPwd = false;
        this.formControl.addValidators(this.repeatedPwdValidator());
        break;
    }



    this.invalid.emit(!this.formControl.value);
    this.formControl.statusChanges.subscribe(() => this.invalid.emit(this.formControl.invalid));
    this.formControl.valueChanges.subscribe(change => {
      this.value.emit(change);
    });
  }


  repeatedPwdValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const repeatValid = this.formControl.value === this.repeatedPwd;
      console.log(control.value, this.repeatedPwd)
      if(this.type === 'repeat')
        return !repeatValid ? {wrongRepeat: {repeat: control.value, original: this.repeatedPwd}} : null;

      return repeatValid ? {wrongRepeat: {repeat: control.value, original: this.repeatedPwd}} : null;
    };
  }


  getPatternErrors() {

    let errors: string[] = [];
    this.securePasswordRegEx.forEach(p => {
      if(!new RegExp(p.regex).test(this.formControl.value))
        errors.push(p.name);
    });

    return errors;
  }



}

