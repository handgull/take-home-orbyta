import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  isDevMode,
  LOCALE_ID,
  provideAppInitializer,
  inject,
} from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { provideHttpClient } from "@angular/common/http";
import { TranslocoHttpLoader } from "./transloco-loader";
import {
  getBrowserCultureLang,
  provideTransloco,
  Translation,
  TranslocoService,
} from "@jsverse/transloco";
import { lastValueFrom } from "rxjs";
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MAT_MOMENT_DATE_FORMATS } from "@angular/material-moment-adapter";

function initializeTranslations(translateService: TranslocoService) {
  return (): Promise<Translation> =>
    lastValueFrom(translateService.load(getBrowserCultureLang() ?? "en-US"));
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: ["en-US", "it-IT"],
        defaultLang: getBrowserCultureLang(),
        reRenderOnLangChange: false,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    provideAppInitializer(() => {
      const initializerFn = initializeTranslations(inject(TranslocoService));
      return initializerFn();
    }),
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    {
      provide: LOCALE_ID,
      useFactory: (ts: TranslocoService) => ts.getActiveLang(),
      deps: [TranslocoService],
    },
    {
      provide: MAT_DATE_LOCALE,
      useFactory: (locale: string) => locale,
      deps: [LOCALE_ID],
    },
  ],
};
