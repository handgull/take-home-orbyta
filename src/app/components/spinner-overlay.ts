import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "app-spinner-overlay",
  imports: [MatProgressSpinnerModule],
  template: `
    <div class="absolute flex size-full items-center justify-center">
      <mat-spinner></mat-spinner>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerOverlay {}
