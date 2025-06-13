import { Component } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { FiltersForm } from "../../components/filters-form";
import { TemperatureChart } from "../../components/temperature-chart";
import { TranslocoModule } from "@jsverse/transloco";

@Component({
  selector: "app-dashboard-page",
  imports: [TranslocoModule, MatCardModule, FiltersForm, TemperatureChart],
  template: `
    <ng-container *transloco="let t">
      <section class="main-container">
        <div class="main-card">
          <mat-card appearance="outlined" class="w-full md:w-fit">
            <mat-card-content>
              <app-filters-form [title]="t('filters')" />
            </mat-card-content>
          </mat-card>
          <mat-card appearance="outlined" class="w-full">
            <mat-card-content>
              <app-temperature-chart />
            </mat-card-content>
          </mat-card>
        </div>
      </section>
    </ng-container>
  `,
  styleUrl: "./dashboard.css",
})
export default class DashboardPage {}
