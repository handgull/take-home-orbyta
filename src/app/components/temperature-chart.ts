import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from "@angular/core";
import * as PlotlyJS from "plotly.js-dist-min";
import { PlotlyModule } from "angular-plotly.js";
import { SensorDataPoint } from "@/models/sensors";
import { TranslocoService } from "@jsverse/transloco";
import { toSignal } from "@angular/core/rxjs-interop";

PlotlyModule.plotlyjs = PlotlyJS;

@Component({
  selector: "app-temperature-chart",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PlotlyModule],
  template: `
    <plotly-plot
      [data]="plotData()"
      [layout]="plotLayout()"
      [config]="plotConfig"
    ></plotly-plot>
  `,
  styles: ``,
})
export class TemperatureChart {
  private _transloco = inject(TranslocoService);
  data = input.required<SensorDataPoint[]>();
  isDark = input.required<boolean>();

  private readonly _chartTitle = toSignal(
    this._transloco.selectTranslate("temperatureChartTitle"),
  );
  private readonly _xaxisTitle = toSignal(
    this._transloco.selectTranslate("utcDate"),
  );
  private readonly _yaxisTitle = toSignal(
    this._transloco.selectTranslate("celsius"),
  );
  readonly plotLayout = computed(() => ({
    title: { text: this._chartTitle() },
    xaxis: {
      title: { text: this._xaxisTitle() },
      zerolinecolor: this.isDark() ? "#444" : "#888",
      gridcolor: this.isDark() ? "#444" : "#888",
    },
    yaxis: {
      title: { text: this._yaxisTitle() },
      zerolinecolor: this.isDark() ? "#444" : "#888",
      gridcolor: this.isDark() ? "#444" : "#888",
    },
    margin: { l: 46, r: 12, t: 46, b: 46 },
    paper_bgcolor: "transparent",
    plot_bgcolor: "transparent",
    font: { color: this.isDark() ? "#fff" : "#222" },
  }));
  readonly plotConfig = {
    responsive: true,
    displaylogo: false,
    displayModeBar: false,
  };
  // TODO this computed can be optimized with only 1 iteration on data
  readonly plotData = computed(() => [
    {
      x: this.data().map((point) => point.timestamp),
      y: this.data().map((point) => point.timestamp),
      type: "scatter",
      mode: "lines+points",
    },
  ]);
}
