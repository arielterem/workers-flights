import { Injectable, computed, signal } from '@angular/core';
import { IFlight } from '../interfaces/flight.interface';
import { PullDataService } from './pull-data.service';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  constructor(private pullDataService: PullDataService) {}

  // Internal reactive state using signals
  private _selectedWorkerID = signal<number | null>(null);    // Currently selected worker ID
  private _flightsList = signal<IFlight[]>([]);               // List of flights for the selected worker
  private _selectedFlight = signal<IFlight | null>(null);     // Currently selected flight
  private _countdown = signal<number>(60);                    // Countdown timer in seconds

  // Computed values: read-only access to the state above
  readonly selectedWorkerID = computed(() => this._selectedWorkerID());
  readonly flightsList = computed(() => this._flightsList());
  readonly selectedFlight = computed(() => this._selectedFlight());
  readonly countdown = computed(() => this._countdown());

  // Called when a worker is selected
  setSelectedWorkerID(id: number): void {
    if (id == null || id < 0) return;  // Validate ID before setting
    this._selectedWorkerID.set(id);    // Update worker ID
    this._selectedFlight.set(null);    // Clear previously selected flight
    this.loadFlightsForWorker(id);     // Load flights for the new worker
  }

  // Updates the selected flight (can be null)
  setSelectedFlight(flight: IFlight | null): void {
    this._selectedFlight.set(flight);
  }

  // Fetches the flights for a given worker ID
  loadFlightsForWorker(workerId: number): void {
    this.pullDataService.getFlightsByWorker(workerId).subscribe({
      next: (flights) => {
        this._flightsList.set(flights);                          // Update the flights list
        this._selectedFlight.set(flights[0] ?? null);            // Auto-select the first flight (if any)
        this.resetCountdown();                                   // Restart countdown
      },
      error: (err) => {
        console.error('Failed to load flights:', err);
        this._flightsList.set([]);                               // Clear list on failure
        this._selectedFlight.set(null);                          // Clear selected flight
      }
    });
  }

  // Resets the countdown to 60 seconds
  resetCountdown() {
    this._countdown.set(60);
  }

  // Decreases the countdown by 1 second. Resets to 60 if it reaches 0.
  decrementCountdown() {
    this._countdown.update(v => v > 0 ? v - 1 : 60);
  }
}
