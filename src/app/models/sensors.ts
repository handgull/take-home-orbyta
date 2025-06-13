import { z } from "zod";

export const SensorDataPointSchema = z
  .object({
    value: z.number(),
    timestamp: z.coerce.date(),
  })
  .strict();

export const SensorDatasetSchema = z
  .object({
    sensor: z.string(),
    data: z.array(SensorDataPointSchema),
  })
  .strict();

export const ApiResponseSchema = z
  .object({
    sensors: z.array(SensorDatasetSchema),
    timeRange: z.object({
      earliest: z.coerce.date(),
      latest: z.coerce.date(),
    }),
  })
  .strict();

export type SensorDataPoint = z.infer<typeof SensorDataPointSchema>;
export type SensorDataset = z.infer<typeof SensorDatasetSchema>;
export type ApiResponse = z.infer<typeof ApiResponseSchema>;
