import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "dashboard",
    loadComponent: () => import("./pages/dashboard-page"),
    title: "Dashboard",
  },
  { path: "**", pathMatch: "full", redirectTo: "dashboard" },
];
