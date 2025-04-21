import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWorker } from '../interfaces/worker.interface';
import { IFlight } from '../interfaces/flight.interface';

@Injectable({
  providedIn: 'root'
})
export class PullDataService {

  // Note: Using proxy configuration (/api) to avoid CORS issues during development

  constructor(private http: HttpClient) { }

  getWorkersList(): Observable<IWorker[]> {
    return this.http.get<IWorker[]>('/api/workers');
  }

  getFlightsByWorker(workerId: number): Observable<IFlight[]> {
    return this.http.get<IFlight[]>(`/api/flights/${workerId}`);
  }
}
