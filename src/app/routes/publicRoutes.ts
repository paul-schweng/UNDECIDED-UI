import {Routes} from "@angular/router";
import {VersionComponent} from "../components/common/footer/version/version.component";
import {ContactComponent} from "../components/common/footer/contact/contact.component";
import {BlogPostsComponent} from "../components/common/footer/blog-posts/blog-posts.component";
import {AboutUsComponent} from "../components/common/footer/about-us/about-us.component";
import {PrivacyPoliciesComponent} from "../components/common/footer/privacy-policies/privacy-policies.component";

export const PUBLIC_ROUTES: Routes = [
  {path: 'privacy-policies', component: PrivacyPoliciesComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'blog-posts', component: BlogPostsComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'versions', component: VersionComponent},
]
