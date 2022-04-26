import {LoginComponent} from "../components/auth/login/login.component";
import {RegisterComponent} from "../components/auth/register/register.component";
import {Routes} from "@angular/router";
import {PrivacyPoliciesComponent} from "../components/common/footer/privacy-policies/privacy-policies.component";
import {ContactComponent} from "../components/common/footer/contact/contact.component";
import {AboutUsComponent} from "../components/common/footer/about-us/about-us.component";
import {BlogPostsComponent} from "../components/common/footer/blog-posts/blog-posts.component";
import {VersionComponent} from "../components/common/footer/version/version.component";

export const AUTH_ROUTES: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'privacy-policies', component: PrivacyPoliciesComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'blog-posts', component: BlogPostsComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'versions', component: VersionComponent}
]
