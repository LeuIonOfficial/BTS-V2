import { CommonModule } from "@angular/common";
import { Component, input, signal } from "@angular/core";
import { MenuItem } from "./navbar.types";
import { appRoutes } from "../../app.routes";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { ProfileDto } from "../../data/dto/profile.type";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ToolbarModule, AvatarModule],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.css",
})
export class NavbarComponent {
  profile = input<ProfileDto>()
  location: string | null = null;

  constructor(private router: Router) {
    this.location = this.router.url;
  }

  mainMenuItems: MenuItem[] = [
    {
      name: "Flights",
      href: appRoutes.requests,
    },
    { name: "Sales", href: appRoutes.sales },
    { name: "Agents", href: appRoutes.agents },
    { name: "Calendar", href: "#" },
  ];

}
