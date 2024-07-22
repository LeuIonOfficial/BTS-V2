import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NavbarComponent } from "../navbar/navbar.component";
import { ProfileService } from "../../data/services/profile.service";
import { AsyncPipe } from "@angular/common";


@Component({
  selector: "app-layout",
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, AsyncPipe],
  templateUrl: "./layout.component.html",
  styleUrl: "./layout.component.css",
})
export class LayoutComponent {
  profileService = inject(ProfileService);
  profile$ = this.profileService.getProfile()
}
