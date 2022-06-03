import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

//------------------------------------------------------------------------------------------

export const VERSION_DATA = [
  {version: '0.4.3', detail: 'Adjust whole CSS code'},
  {version: '0.4.2', detail: 'Added filters to search'},
  {version: '0.4.1', detail: 'Search page got a spinner while loading results'},
  {version: '0.4', detail: 'Everything is being cached'},
  {version: '0.3', detail: 'You can search for users and ratings'},
  {version: '0.2', detail: 'Home page shows you the ratings of people you follow'},
  {version: '0.1.8', detail: 'You can upvote ratings now'},
  {version: '0.1.7', detail: '"Remember Me!" Alright Mr., we can do that'},
  {version: '0.1.6', detail: 'Profile image can be deleted'},
  {version: '0.1.5', detail: 'Public Pages are always accessible! No one cares if you\'re logged in ;)'},
  {version: '0.1.4', detail: 'Added Version Page'},
  {version: '0.1.3', detail: 'Implement Footer'},
  {version: '0.1.2', detail: 'Friends Popup in Profile was added'},
  {version: '0.1.1', detail: 'Added upload function for user image'},
  {version: '0.1', detail: 'Version Number is now available! :)'},
];
