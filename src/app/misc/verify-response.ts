import { map, Observable, pipe } from "rxjs";
import { z } from "zod";
import { isDevMode } from "@angular/core";

export function verifyResponse<T extends z.ZodTypeAny>(zodObj: T) {
  return pipe<Observable<unknown>, Observable<z.infer<T>>>(
    map((response) => {
      const result = zodObj.safeParse(response);

      if (!result.success && isDevMode()) {
        console.error(`[ZOD]: ${result.error}`);
      }
      return result.data ?? response;
    }),
  );
}
