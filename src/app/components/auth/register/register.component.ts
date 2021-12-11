import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/authentication.service";
import {User} from "../../../models/user";
import {DateAdapter} from "@angular/material/core";
import {TranslateService} from "@ngx-translate/core";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [
  ]
})
export class RegisterComponent implements OnInit {

  user: User = {} as User;
  isBusy: boolean = false;
  private readonly TIMEOUT_AUTOCOMPLETE: number = 800;

  formGroup: FormGroup = new FormGroup({
    name: new FormControl(),
    username: new FormControl('', [Validators.pattern(/^[a-z0-9.\-_]+$/), Validators.pattern(/^(?!.*[._\-]{2}).+$/)]),
    birthdate: new FormControl(),
  });
  dateFilter!: (d: (Date | null)) => boolean;

  constructor(private readonly authService: AuthenticationService,
              private adapter: DateAdapter<any>,
              private readonly translate: TranslateService,
              private readonly router: Router) { }

  ngOnInit(): void {
    this.adapter.setLocale(this.translate.currentLang);
    this.dateFilter = (d: Date | null): boolean => {
      return new Date() > (d || new Date());
    };

    let timeoutUsername: number;

    this.formGroup.controls['name'].valueChanges.subscribe(value => this.user.name = value);
    this.formGroup.controls['username'].valueChanges.subscribe(value => {

      this.formGroup.controls['username'].setErrors(null, {emitEvent: false});

      this.user.username = value?.toLowerCase().trim();
      this.formGroup.controls['username'].setValue(this.user.username, {emitEvent: false});

      //check if username is available with timeout for backend call
      if (!timeoutUsername && this.user.username)
        timeoutUsername = setTimeout(() => {
          this.authService.isUsernameAvailable(this.user.username)
            .then(available => {
              if(!available.available)
                this.formGroup.controls['username'].setErrors({unavailable: true})
              console.log(this.formGroup.controls['username'].errors)
            });
          timeoutUsername = 0;
        }, this.TIMEOUT_AUTOCOMPLETE);

    });

  }

  registerClicked() {
    this.isBusy = true;
    this.user.rememberMe = true;
    this.authService.register(this.user)
      .then(() => {
        this.authService.login({username: this.user.email, password: this.user.password})
          .then(auth => {
            if(auth)
              this.router.navigateByUrl('/')
          })
      })
      .finally(() => this.isBusy = false);
    console.log(this.user);
  }

  isInvalid() {
    return this.formGroup.controls['name'].invalid ||
      this.formGroup.controls['username'].invalid ||
      this.formGroup.controls['birthdate'].invalid;
  }

  changeDate(date: MatDatepickerInputEvent<Date>) {
    this.user.birthdate = date.value!;
  }

}

