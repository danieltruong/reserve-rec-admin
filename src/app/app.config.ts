import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ConfigService } from './services/config.service';
import { provideHttpClient } from '@angular/common/http';
import { AutoFetchService } from './services/auto-fetch.service';
import { ToastService } from './services/toast.service';

import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';
import { AmplifyService } from './services/amplify.service';

export function initConfig(
  configService: ConfigService,
  autoFetchService: AutoFetchService,
  amplifyService: AmplifyService
) {
  return async () => {
    await configService.init();
    await amplifyService.init();
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [ConfigService, AutoFetchService, AmplifyService],
      multi: true
    },
    ConfigService,
    AutoFetchService,
    ToastService,
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
  ]
};
