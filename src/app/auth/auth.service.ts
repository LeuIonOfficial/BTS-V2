import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { LoginPayload, LoginResponse } from "./auth.types";
import { tap } from "rxjs";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  http = inject(HttpClient);
  baseUrlApi = "http://localhost:8000/api/auth";
  cookieService = inject(CookieService);

  access_token: string | null = null;

  get isAuth() {
    if (!this.access_token) {
      this.access_token = this.cookieService.get("access_token");
    }
    return !!this.access_token;
  }

  login(payload: LoginPayload) {
    return this.http
      .post<LoginResponse>(`${this.baseUrlApi}/login`, payload)
      .pipe(
        tap((val) => {
          this.access_token = val.access_token;
          this.cookieService.set("access_token", this.access_token);
        }),
      );
  }
}
