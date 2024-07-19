import { CommonModule } from "@angular/common";
import { Component, signal } from "@angular/core";
import { MenuItem } from "./navbar.types";
import { appRoutes } from "../../app.routes";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.css",
})
export class NavbarComponent {
  isMobileMenuOpen = signal(false);
  isProfileMenuOpen = signal(false);

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

  profileMenuItems: MenuItem[] = [
    { name: "Your Profile", href: "#" },
    { name: "Settings", href: "#" },
    { name: "Sign out", href: "#" },
  ];

  toggleMobileMenu() {
    this.isMobileMenuOpen.set(!this.isMobileMenuOpen());
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen.set(!this.isProfileMenuOpen());
  }
}
