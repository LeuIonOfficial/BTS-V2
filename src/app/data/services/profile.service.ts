import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ProfileResponse } from "../dto/profile.type";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  http = inject(HttpClient);
  baseUrlApi = "http://localhost:8000/api";

  getProfile() {
    return this.http.get<ProfileResponse>(`${this.baseUrlApi}/me`);
  }
}
