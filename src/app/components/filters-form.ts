import { Sensors } from "@/services/sensors";
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  OnInit,
} from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { provideMomentDateAdapter } from "@angular/material-moment-adapter";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { TranslocoModule } from "@jsverse/transloco";
import { debounceTime, filter } from "rxjs";

@Component({
  selector: "app-filters-form",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TranslocoModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  providers: [provideMomentDateAdapter()],
  template: `
    <ng-container *transloco="let t">
      <section class="flex flex-col gap-2" [class]="applyDisabled()">
        <h2 class="pb-4 text-2xl">{{ t("filters") }}</h2>
        <form [formGroup]="form" class="contents">
          <mat-form-field>
            <mat-label>{{ t("relevationsDatePickerHint") }}</mat-label>
            <mat-date-range-input [rangePicker]="picker">
              <input
                formControlName="from"
                matStartDate
                [placeholder]="t('from')"
              />
              <input formControlName="to" matEndDate [placeholder]="t('to')" />
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
            </mat-label>
            <mat-select formControlName="sensor">
              @for (sensor of sensors(); track sensor) {
                <mat-option [value]="sensor">{{ sensor }}</mat-option>
              }
            </mat-select>
          </mat-form-field>
        </form>
      </section>
    </ng-container>
  `,
  styles: ``,
})
export class FiltersForm implements OnInit {
  sensors = input.required<string[]>();
  disabled = input<boolean>(false);
  private readonly _sensorsService = inject(Sensors);

  private readonly _today = new Date();
  private _thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  form = new FormGroup({
    from: new FormControl(this._thirtyDaysAgo, [Validators.required]),
    to: new FormControl(this._today, [Validators.required]),
    sensor: new FormControl("", [Validators.required]),
  });

  constructor() {
    effect(() => {
      if (this.disabled()) {
        this.form.disable({ emitEvent: false });
      } else {
        this.form.enable({ emitEvent: false });
      }
    });
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        debounceTime(350),
        filter(() => this.form.valid),
      )
      .subscribe((values) => {
        this._sensorsService.filterData(
          values.from!,
          values.to!,
          values.sensor!,
        );
      });
  }

  applyDisabled() {
    return {
      "opacity-50": this.disabled(),
    };
  }
}
