import { endpoints } from "@/misc/constants";
import { verifyResponse } from "@/misc/verify-response";
import { ApiResponse, ApiResponseSchema } from "@/models/sensors";
import { HttpClient } from "@angular/common/http";
import { computed, inject, Injectable, signal } from "@angular/core";
import { catchError, delay, tap, throwError } from "rxjs";

enum FetchStatus {
  fetching,
  fetched,
  errorFetching,
}

@Injectable({
  providedIn: "root",
})
export class Sensors {
  private _http = inject(HttpClient);

  private _sensorsRes = signal<ApiResponse | null>(null);
  readonly sensorsRes = computed(() => this._sensorsRes());
  private _fetchStatus = signal<FetchStatus | null>(null);
  readonly fetchStatus = computed(() => this._fetchStatus());
  readonly fetching = computed(
    () => this._fetchStatus() === FetchStatus.fetching,
  );
  readonly errorFetching = computed(
    () => this._fetchStatus() === FetchStatus.errorFetching,
  );
  private _from = signal<Date | null>(null);
  private _to = signal<Date | null>(null);
  private _activeSensor = signal<string | null>(null);
  readonly sensors = computed(
    () => this._sensorsRes()?.sensors.map((e) => e.sensor) ?? [],
  );
  readonly filteredData = computed(() => {
    if (!this._activeSensor() || !this._from() || !this._to()) return [];

    const filtered =
      this._sensorsRes()
        ?.sensors.find((e) => e.sensor === this._activeSensor())
        ?.data.filter(
          (data) =>
            data.timestamp >= this._from()! && data.timestamp <= this._to()!,
        ) ?? [];

    return filtered;
  });

  fetchData() {
    this._fetchStatus.set(FetchStatus.fetching);
    this._http
      .get<ApiResponse>(endpoints.relevations)
      .pipe(
        delay(1500), // Fake latency
        verifyResponse(ApiResponseSchema),
        tap((_) => {
          this._fetchStatus.set(FetchStatus.fetched);
        }),
        catchError((error, _) => {
          this._sensorsRes.set(null);
          this._fetchStatus.set(FetchStatus.errorFetching);
          console.error("[SensorsService] Error while fetching");
          return throwError(() => error);
        }),
      )
      .subscribe((res) => this._sensorsRes.set(res));
  }

  filterData(from: Date, to: Date, sensor: string) {
    this._from.set(from);
    this._to.set(to);
    this._activeSensor.set(sensor);
  }
}
