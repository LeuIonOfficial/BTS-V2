import { Routes } from "@angular/router";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { LayoutComponent } from "./common-ui/layout/layout.component";
import { canActivateAuth } from "./auth/access.guard";
import { RequestsPageComponent } from "./pages/requests-page/requests-page.component";
import { AgentsPageComponent } from "./pages/agents-page/agents-page.component";
import { SalesPageComponent } from "./pages/sales-page/sales-page.component";

export const appRoutes = {
  login: "login",
  home: "home",
  sales: "sales",
  requests: "requests",
  agents: "agents",
};

export const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: appRoutes.requests,
        component: RequestsPageComponent,
      },
      {
        path: appRoutes.agents,
        component: AgentsPageComponent,
      },
      {
        path: appRoutes.sales,
        component: SalesPageComponent,
      },
    ],
    component: LayoutComponent,
    canActivate: [canActivateAuth],
  },
  {
    path: appRoutes.login,
    component: LoginPageComponent,
  },
];
