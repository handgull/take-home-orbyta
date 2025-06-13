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
  getBrowserLang,
  provideTransloco,
  Translation,
  TranslocoService,
} from "@jsverse/transloco";
import { lastValueFrom } from "rxjs";

function initializeTranslations(translateService: TranslocoService) {
  return (): Promise<Translation> =>
    lastValueFrom(translateService.load(getBrowserLang() ?? "en"));
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: LOCALE_ID,
      deps: [],
      useFactory: () => getBrowserLang(),
    },
    provideTransloco({
      config: {
        availableLangs: ["en", "it"],
        defaultLang: getBrowserLang(),
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    provideAppInitializer(() => {
      const initializerFn = initializeTranslations(inject(TranslocoService));
      return initializerFn();
    }),
  ],
};
