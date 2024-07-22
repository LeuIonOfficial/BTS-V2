import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FlightResponse } from '../dto/flights.type';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  http = inject(HttpClient)
  baseUrlApi = "http://localhost:8000/api";

  getFlights(page: number, per_page: number) {
    return this.http.get<FlightResponse>(`${this.baseUrlApi}/flights`, {params: {
      page,
      per_page
    }})
  }

  postFlight(payload: any) {
    return this.http.post(`${this.baseUrlApi}/flights`, payload)
  }
}
