import { environment } from "@/../environments/environment";

export const endpoints = {
  sensors: `${environment.baseUrl}/sensors`,
  timeRange: `${environment.baseUrl}/timeRange`,
};
