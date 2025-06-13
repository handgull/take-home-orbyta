import { ChangeDetectionStrategy, Component, input } from "@angular/core";

@Component({
  selector: "app-filters-form",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <h2>{{ title() }}</h2>
  `,
  styles: ``,
})
export class FiltersForm {
  title = input<string>();
}
