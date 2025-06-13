import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: "app-ui-overlay",
  imports: [MatProgressSpinnerModule, NgOptimizedImage],
  template: `
    <div class="overlay">
      @if (emptyState()) {
        @defer {
          <img
            ngSrc="/assets/no-data.webp"
            alt="no data"
            height="256"
            width="256"
          />
        } @placeholder {
          <mat-spinner></mat-spinner>
        }
      } @else {
        <mat-spinner></mat-spinner>
      }
    </div>
  `,
  styleUrl: "./ui-overlay.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UIOverlay {
  emptyState = input(false);
}
