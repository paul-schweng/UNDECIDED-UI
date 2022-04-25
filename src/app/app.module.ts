import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloWorldComponent } from './components/hello-world/hello-world.component';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgBusyModule} from "ng-busy";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BusyDivComponent } from './components/common/busy-div/busy-div.component';
import {CgBusyModule} from "angular-busy2";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {ToastrModule} from "ngx-toastr";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/common/main-frame/nav-bar/nav-bar.component';
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import { SearchComponent } from './components/search/search.component';
import { RatingsComponent } from './components/ratings/ratings.component';
import { ProfileComponent } from './components/profile/profile.component';
import {MatLineModule, MatOptionModule, MatRippleModule} from "@angular/material/core";
import {MatListModule} from "@angular/material/list";
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {RatingDialogComponent } from './components/dialogs/rating-dialog/rating-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {NgxStarsModule} from "ngx-stars";
import { BaseRatingComponent } from './components/common/base-rating/base-rating.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {AuthenticationService} from "./services/authentication.service";
import {XhrInterceptor} from "./providers/xhr.interceptor";
import {initApp} from "./providers/initApp";
import { AuthComponent } from './components/auth/auth.component';
import { MainFrameComponent } from './components/common/main-frame/main-frame.component';
import { AuthNavbarComponent } from './components/auth/auth-navbar/auth-navbar.component';
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatExpansionModule} from "@angular/material/expansion";
import { SettingsComponent } from './components/profile/settings/settings.component';
import { InputEmailComponent } from './components/common/input-email/input-email.component';
import { InputPwdComponent } from './components/common/input-pwd/input-pwd.component';
import { MatNativeDateModule } from '@angular/material/core';
import { ChipsAutocompleteComponent } from './components/common/chips-autocomplete/chips-autocomplete.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatCardModule} from "@angular/material/card";
import { MapsDialogComponent } from './components/dialogs/maps-dialog/maps-dialog.component';
import { ImageUploadDialogComponent } from './components/dialogs/image-upload-dialog/image-upload-dialog.component';
import { WebcamDialogComponent } from './components/dialogs/webcam-dialog/webcam-dialog.component';
import {WebcamModule} from "ngx-webcam";
import { ConfirmationDialogComponent } from './components/dialogs/confirmation-dialog/confirmation-dialog.component';
import {MatBadgeModule} from "@angular/material/badge";
import {MatTooltipModule} from "@angular/material/tooltip";
import { ChangeEmailComponent } from './components/profile/settings/change-email/change-email.component';
import { ChangePasswordComponent } from './components/profile/settings/change-password/change-password.component';
import { MoreSettingsComponent } from './components/profile/settings/more-settings/more-settings.component';
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import { FollowDialogComponent } from './components/dialogs/follow-dialog/follow-dialog.component';
import {MatTabsModule} from "@angular/material/tabs";
import { PrivacyPoliciesComponent } from './components/common/footer/privacy-policies/privacy-policies.component';
import { ContactComponent } from './components/common/footer/contact/contact.component';
import {FooterComponent} from "./components/common/footer/footer.component";
import { AboutUsComponent } from './components/common/footer/about-us/about-us.component';
import { BlogPostsComponent } from './components/common/footer/blog-posts/blog-posts.component';


@NgModule({
  declarations: [
    AppComponent,
    HelloWorldComponent,
    BusyDivComponent,
    HomeComponent,
    NavBarComponent,
    SearchComponent,
    RatingsComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    RatingDialogComponent,
    BaseRatingComponent,
    AuthComponent,
    MainFrameComponent,
    AuthNavbarComponent,
    SettingsComponent,
    InputEmailComponent,
    InputPwdComponent,
    ChipsAutocompleteComponent,
    MapsDialogComponent,
    ImageUploadDialogComponent,
    WebcamDialogComponent,
    ConfirmationDialogComponent,
    ChangeEmailComponent,
    ChangePasswordComponent,
    MoreSettingsComponent,
    FollowDialogComponent,
    PrivacyPoliciesComponent,
    ContactComponent,
    FooterComponent,
    AboutUsComponent,
    BlogPostsComponent,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        BrowserAnimationsModule,
        NgBusyModule,
        NgbModule,
        CgBusyModule.forRoot({
            backdrop: true
        }),
        MatProgressSpinnerModule,
        MatDatepickerModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        MatSlideToggleModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatDividerModule,
        MatRippleModule,
        MatListModule,
        MatLineModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatDialogModule,
        NgxStarsModule,
        MatAutocompleteModule,
        FormsModule,
        MatRadioModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatNativeDateModule,
        MatChipsModule,
        MatCardModule,
        WebcamModule,
        MatBadgeModule,
        MatTooltipModule,
        InfiniteScrollModule,
        MatTabsModule

    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: XhrInterceptor,
      multi: true
    }, {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      multi: true,
      deps: [AuthenticationService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
