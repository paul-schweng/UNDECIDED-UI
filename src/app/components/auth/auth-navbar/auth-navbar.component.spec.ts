import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthNavbarComponent } from './auth-navbar.component';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";

describe('AuthNavbarComponent', () => {
  let component: AuthNavbarComponent;
  let fixture: ComponentFixture<AuthNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthNavbarComponent ],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [ TranslateService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
