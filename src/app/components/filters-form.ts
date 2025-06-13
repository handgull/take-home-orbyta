import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { TranslocoModule } from "@jsverse/transloco";

@Component({
  selector: "app-filters-form",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TranslocoModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
  ],
  template: `
    <ng-container *transloco="let t">
      <section class="flex flex-col gap-2">
        <h2 class="pb-4 text-2xl">{{ t("filters") }}</h2>
        <mat-form-field>
          <mat-label>{{ t("relevationsDatePickerHint") }}</mat-label>
          <mat-date-range-input [rangePicker]="picker">
            <input matStartDate [placeholder]="t('from')" />
            <input matEndDate [placeholder]="t('to')" />
          </mat-date-range-input>
          <mat-hint>MM/DD/YYYY – MM/DD/YYYY</mat-hint>
          <mat-datepicker-toggle
            matIconSuffix
            [for]="picker"
          ></mat-datepicker-toggle>
          <mat-date-range-picker #picker></mat-date-range-picker>
        </mat-form-field>
        <mat-form-field>
          <mat-label>
            {{ t("sensor") }}
            <span class="text-red-500">*</span>
          </mat-label>
          <mat-select>
            @for (sensor of sensors; track sensor) {
              <mat-option [value]="sensor">{{ sensor }}</mat-option>
            }
          </mat-select>
        </mat-form-field>
      </section>
    </ng-container>
  `,
  styles: ``,
})
export class FiltersForm {
  sensors = ["Steak", "Pizza", "Tacos"];
}
