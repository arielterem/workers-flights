import { Injectable, computed, signal } from '@angular/core';
import { IFlight } from '../interfaces/flight.interface';
import { PullDataService } from './pull-data.service';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  constructor(private pullDataService: PullDataService) {}

  // State signals
  private _selectedWorkerID = signal<number | null>(null);
  private _flightsList = signal<IFlight[]>([]);
  private _selectedFlight = signal<IFlight | null>(null);
  private _countdown = signal<number>(60);

  // Computed values
  readonly selectedWorkerID = computed(() => this._selectedWorkerID());
  readonly flightsList = computed(() => this._flightsList());
  readonly selectedFlight = computed(() => this._selectedFlight());
  readonly countdown = computed(() => this._countdown());

  // Public API
  setSelectedWorkerID(id: number): void {
    if (id == null || id < 0) return;
    this._selectedWorkerID.set(id);
    this._selectedFlight.set(null);
    this.loadFlightsForWorker(id);
  }

  setSelectedFlight(flight: IFlight | null): void {
    this._selectedFlight.set(flight);
  }

  loadFlightsForWorker(workerId: number): void {
    this.pullDataService.getFlightsByWorker(workerId).subscribe({
      next: (flights) => {
        this._flightsList.set(flights);
        this._selectedFlight.set(flights[0] ?? null);
        this.resetCountdown();
      },
      error: (err) => {
        console.error('Failed to load flights:', err);
        this._flightsList.set([]);
        this._selectedFlight.set(null);
      }
    });
  }

  // Countdown management
  resetCountdown() {
    this._countdown.set(60);
  }

  decrementCountdown() {
    this._countdown.update(v => v > 0 ? v - 1 : 60);
  }
}
