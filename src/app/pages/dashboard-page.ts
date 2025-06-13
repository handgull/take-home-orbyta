import { Component } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { FiltersForm } from "../components/filters-form";
import { TemperatureChart } from "../components/temperature-chart";

@Component({
  selector: "app-dashboard-page",
  imports: [MatCardModule, FiltersForm, TemperatureChart],
  template: `<section class="flex h-dvh w-dvw justify-center md:items-center">
    <div
      class="m-6 flex w-full max-w-[1200px] flex-col items-start gap-3 md:flex-row"
    >
      <mat-card appearance="outlined">
        <mat-card-content>
          <app-filters-form />
        </mat-card-content>
      </mat-card>
      <mat-card appearance="outlined" class="w-full">
        <mat-card-content>
          <app-temperature-chart />
        </mat-card-content>
      </mat-card>
    </div>
  </section>`,
  styles: ``,
})
export default class DashboardPage {}
