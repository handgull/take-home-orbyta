import { Component, signal } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { FiltersForm } from "../../components/filters-form";
import { TemperatureChart } from "../../components/temperature-chart";

@Component({
  selector: "app-dashboard-page",
  imports: [MatCardModule, FiltersForm, TemperatureChart],
  template: `
    <section class="main-container">
      <div class="main-card">
        <mat-card appearance="outlined" class="w-full md:w-fit">
          <mat-card-content>
            <app-filters-form />
          </mat-card-content>
        </mat-card>
        <mat-card appearance="outlined" class="w-full">
          <mat-card-content>
            <app-temperature-chart [data]="[]" [isDark]="isDark()" />
          </mat-card-content>
        </mat-card>
      </div>
    </section>
  `,
  styleUrl: "./dashboard.css",
})
export default class DashboardPage {
  isDark = signal(window.matchMedia("(prefers-color-scheme: dark)").matches);
}
