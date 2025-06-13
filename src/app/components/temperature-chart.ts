import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-temperature-chart",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <p>temperature-chart works!</p>`,
  styles: ``,
})
export class TemperatureChart {}
