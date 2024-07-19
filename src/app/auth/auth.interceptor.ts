import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const _token = inject(AuthService).access_token;

  if (!_token) {
    return next(req);
  }

  const headers = req.headers.set("Authorization", `Bearer ${_token}`);
  req = req.clone({ headers });
  return next(req);
};
