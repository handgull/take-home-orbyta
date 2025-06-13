import { Routes } from "@angular/router";

export const routes: Routes = [
  // useless lazy-loading, demo purposes
  {
    path: "dashboard",
    loadComponent: () => import("./pages/dashboard/dashboard-page"),
    title: "Dashboard",
  },
  { path: "**", pathMatch: "full", redirectTo: "dashboard" },
];
