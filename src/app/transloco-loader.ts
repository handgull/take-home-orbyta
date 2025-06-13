import { inject, Injectable } from "@angular/core";
import { Translation, TranslocoLoader } from "@jsverse/transloco";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class TranslocoHttpLoader implements TranslocoLoader {
  private _http = inject(HttpClient);

  getTranslation(lang: string) {
    return this._http.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}
