import { Injectable, computed, signal } from '@angular/core';
import { IFlight } from '../interfaces/flight.interface';
import { PullDataService } from './pull-data.service';
import { Subscription, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  constructor(private pullDataService: PullDataService) {}

  // Internal signals
  private _selectedWorkerID = signal<number | null>(null);
  private _flightsList = signal<IFlight[]>([]);
  private _selectedFlight = signal<IFlight | null>(null);
  private _countdown = signal<number>(60); // Start countdown at 60 seconds

  // Exposed computed signals
  readonly selectedWorkerID = computed(() => this._selectedWorkerID());
  readonly flightsList = computed(() => this._flightsList());
  readonly selectedFlight = computed(() => this._selectedFlight());
  readonly countdown = computed(() => this._countdown());

  private _refreshSub: Subscription | null = null;
  private _countdownSub: Subscription | null = null;

  /** Sets the selected worker and starts auto-refresh */
  setSelectedWorkerID(id: number): void {
    if (id == null || id < 0) return;

    this._selectedWorkerID.set(id);
    this._selectedFlight.set(null);
    this.loadFlightsForWorker(id);
    this.startAutoRefresh(id);
    this.startCountdown();
  }

  /** Sets the selected flight */
  setSelectedFlight(flight: IFlight | null): void {
    this._selectedFlight.set(flight);
    console.log(' selected');

  }

  /** Loads flight data for a worker */
  loadFlightsForWorker(workerId: number): void {
    this.pullDataService.getFlightsByWorker(workerId).subscribe({
      next: (flights) => {
        this._flightsList.set(flights);
        this._selectedFlight.set(flights[0] ?? null);
        console.log('now, ', this._countdown());
      },
      error: (err) => {
        console.error('Failed to load flights:', err);
        this._flightsList.set([]);
        this._selectedFlight.set(null);
      }
    });
  }

  /** Starts a timer to refresh data every 60 seconds */
  private startAutoRefresh(workerId: number): void {
    this._refreshSub?.unsubscribe(); // Cleanup any previous subscription

    this._refreshSub = timer(60000, 60000).subscribe(() => {
      this.loadFlightsForWorker(workerId);
    });
  }

  /** Starts countdown timer to track time remaining */
private startCountdown(): void {
  this._countdownSub?.unsubscribe(); // Cleanup any previous countdown

  this._countdown.set(60); // Reset to 60 every time a new worker is selected

  // Start countdown timer that ticks every second
  this._countdownSub = timer(0, 1000).subscribe(() => {
    const currentCountdown = this._countdown();
    if (currentCountdown <= 0) {
      this._countdown.set(60); // Just reset the countdown
    } else {
      this._countdown.set(currentCountdown - 1); // Decrement
    }
  });
}

  
}
