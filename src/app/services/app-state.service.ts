import { Injectable, Signal, signal, effect } from '@angular/core';
import { IFlight } from '../interfaces/flight.interface';
import { PullDataService } from './pull-data.service';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  constructor(private pullDataService: PullDataService) {}

  private selectedWorkerID = signal<number | null>(null);
  private flightsList = signal<IFlight[]>([]);
  private selectedFlight = signal<IFlight | null>(null);

  private countdown = signal<number>(0);
  private timerRef: any = null;

  /** Called when user selects a worker */
  setSelectedWorkerID(id: number): void {
    if (id == null || id < 0) return;

    this.selectedWorkerID.set(id);
    this.selectedFlight.set(null);
    this.loadFlightsForWorker(id);

    this.startCountdownTimer();
  }

  getSelectedWorkerID(): number | null {
    return this.selectedWorkerID();
  }

  getFlightsList(): IFlight[] {
    return this.flightsList();
  }

  getSelectedFlight(): IFlight | null {
    return this.selectedFlight();
  }

  setSelectedFlight(flight: IFlight | null): void {
    this.selectedFlight.set(flight);
  }

  getFlightInfo(num: string): IFlight | undefined {
    if (!num) return undefined;
    return this.flightsList().find(flight => flight.num === num);
  }

  /** Returns the current countdown in seconds */
  getCountdown(): number {
    return this.countdown();
  }

  /** Starts a 60-second timer and refreshes data every time it ends */
  private startCountdownTimer(): void {
    if (this.timerRef) {
      clearInterval(this.timerRef);
    }

    this.countdown.set(60);

    this.timerRef = setInterval(() => {
      const current = this.countdown();
      if (current <= 1) {
        // refresh flights and reset timer
        const id = this.selectedWorkerID();
        if (id != null) {
          this.loadFlightsForWorker(id);
        }
        this.countdown.set(60);
      } else {
        this.countdown.set(current - 1);
      }
    }, 1000);
  }

  /** Calls API to load flights of selected worker */
  private loadFlightsForWorker(workerId: number): void {
    this.pullDataService.getFlightsByWorker(workerId).subscribe({
      next: (flights) => {
        if (Array.isArray(flights)) {
          this.flightsList.set(flights);
          this.selectedFlight.set(flights[0] ?? null);
        } else {
          this.flightsList.set([]);
          this.selectedFlight.set(null);
        }
      },
      error: (err) => {
        console.error('Failed to load flights:', err);
        this.flightsList.set([]);
        this.selectedFlight.set(null);
      }
    });
  }
}
