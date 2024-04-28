import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withViewTransitions(
        {
          skipInitialTransition: true,
          // onViewTransitionCreated()
        }
      )
    ),
    provideClientHydration(),
    importProvidersFrom(
      HttpClientModule,
      BrowserModule,
      BrowserAnimationsModule, // required animations module
      ToastrModule.forRoot(), // ToastrModule added
    )
  ]
};
