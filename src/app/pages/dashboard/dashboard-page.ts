import { Component, effect, inject, OnInit, signal } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { FiltersForm } from "../../components/filters-form";
import { TemperatureChart } from "../../components/temperature-chart";
import { Sensors } from "@/services/sensors";
import { UIOverlay } from "@/components/ui-overlay/ui-overlay";
import { MatSnackBar } from "@angular/material/snack-bar";
import { toSignal } from "@angular/core/rxjs-interop";
import { TranslocoService } from "@jsverse/transloco";

@Component({
  selector: "app-dashboard-page",
  imports: [MatCardModule, FiltersForm, TemperatureChart, UIOverlay],
  template: `
    <section class="main-container">
      <div class="main-card">
        <mat-card appearance="outlined" class="w-full md:w-fit">
          <mat-card-content class="relative">
            @if (loading()) {
              <app-ui-overlay />
            }
            <app-filters-form [disabled]="loading()" [sensors]="sensors()" />
          </mat-card-content>
        </mat-card>
        <mat-card appearance="outlined" class="h-[480px] w-full">
          <mat-card-content class="h-full">
            <app-temperature-chart [data]="chartData()" [isDark]="isDark()" />
          </mat-card-content>
        </mat-card>
      </div>
    </section>
  `,
  styleUrl: "./dashboard.css",
})
export default class DashboardPage implements OnInit {
  private readonly _sensorsService = inject(Sensors);
  private _snackBar = inject(MatSnackBar);
  private _transloco = inject(TranslocoService);

  isDark = signal(window.matchMedia("(prefers-color-scheme: dark)").matches);
  private readonly _errorFetchingMessage = toSignal(
    this._transloco.selectTranslate("errorFetching"),
  );
  private readonly _retryText = toSignal(
    this._transloco.selectTranslate("retry"),
  );

  get sensors() {
    return this._sensorsService.sensors;
  }

  get chartData() {
    return this._sensorsService.filteredData;
  }

  get loading() {
    return this._sensorsService.fetching;
  }

  constructor() {
    effect(() => {
      if (this._sensorsService.errorFetching()) {
        this._snackBar
          .open(this._errorFetchingMessage(), this._retryText())
          .onAction()
          .subscribe(() => this._sensorsService.fetchData());
      }
    });
  }

  ngOnInit(): void {
    this._sensorsService.fetchData();
  }
}
