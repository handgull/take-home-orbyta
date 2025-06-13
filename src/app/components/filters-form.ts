import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import {
  MomentDateAdapter,
  provideMomentDateAdapter,
} from "@angular/material-moment-adapter";
import { DateAdapter, MAT_DATE_LOCALE } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
  selector: "app-filters-form",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatFormFieldModule, MatDatepickerModule],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
  ],
  template: `
    <section>
      <h2 class="pb-4 text-2xl">{{ title() }}</h2>
      <mat-form-field>
        <mat-label>Enter a date range</mat-label>
        <mat-date-range-input [rangePicker]="picker">
          <input matStartDate placeholder="Start date" />
          <input matEndDate placeholder="End date" />
        </mat-date-range-input>
        <mat-hint>MM/DD/YYYY – MM/DD/YYYY</mat-hint>
        <mat-datepicker-toggle
          matIconSuffix
          [for]="picker"
        ></mat-datepicker-toggle>
        <mat-date-range-picker #picker></mat-date-range-picker>
      </mat-form-field>
    </section>
  `,
  styles: ``,
})
export class FiltersForm {
  title = input<string>();
}
