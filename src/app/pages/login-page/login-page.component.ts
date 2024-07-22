import { Component, inject } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AuthService } from "../../auth/auth.service";
import { Router } from "@angular/router";
import { appRoutes } from "../../app.routes";

@Component({
  selector: "app-login-page",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./login-page.component.html",
  styleUrl: "./login-page.component.css",
})
export class LoginPageComponent {
  authService = inject(AuthService);
  router = inject(Router);

  form = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  onSubmit() {
    if (this.form.valid) {
      this.authService
        // @ts-ignore
        .login(this.form.value)
        .subscribe((res) => this.router.navigate([appRoutes.requests]));
    }
  }
}
