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
  {version: '0.1.5', detail: 'Public Pages are always accessible! No one cares if you\'re logged in ;)'},
  {version: '0.1.4', detail: 'Added Version Page'},
  {version: '0.1.3', detail: 'Implement Footer'},
  {version: '0.1.2', detail: 'Friends Popup in Profile was added'},
  {version: '0.1.1', detail: 'Added upload function for user image'},
  {version: '0.1', detail: 'Version Number is now available! :)'},
];
