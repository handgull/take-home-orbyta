import { Component, DOCUMENT, inject, LOCALE_ID, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  imports: [RouterOutlet],
  template: `
    <router-outlet />
  `,
  styles: [],
})
export class App implements OnInit {
  private _document = inject(DOCUMENT);
  private _localeId = inject(LOCALE_ID);

  ngOnInit(): void {
    this._document.documentElement.setAttribute("lang", this._localeId);
  }
}
