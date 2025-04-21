import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { IWorker } from '../../../interfaces/worker.interface';
import { AppStateService } from '../../../services/app-state.service';
import { PullDataService } from '../../../services/pull-data.service';
import { Subscription, timer } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-workers-list',
  standalone: true,
  imports: [CommonModule, MatListModule, MatCardModule],
  templateUrl: './workers-list.component.html',
  styleUrls: ['./workers-list.component.scss']
})
export class WorkersListComponent implements OnInit, OnDestroy {
  // List of workers to be displayed in the UI
  workersList: IWorker[] = [];

  // Holds all active timer subscriptions, such as auto-refresh and countdown
  private timerSubs = new Subscription();

  constructor(
    public appStateService: AppStateService,
    private pullDataService: PullDataService
  ) {}

  ngOnInit(): void {
    // Load the initial list of workers on component initialization
    this.loadWorkers();
  }

  ngOnDestroy(): void {
    // Cleanup: unsubscribe from any running timers to prevent memory leaks
    this.timerSubs.unsubscribe();
  }

  // Fetches the list of workers from the server
  loadWorkers(): void {
    this.pullDataService.getWorkersList().subscribe({
      next: (res) => this.workersList = res,
      error: (err) => console.error(err)
    });
  }

  // Called when a worker is selected from the list
  onSelectWorker(id: number): void {
    if (id == null) return; // Defensive check to avoid null or undefined IDs

    // Save the selected worker ID in the application state
    this.appStateService.setSelectedWorkerID(id);

    // Clear any previous timers to avoid duplication
    this.cleanupTimers();

    // Start periodic refresh for loading flights related to this worker
    this.startAutoRefresh(id);

    // Start a countdown timer (for example, for showing time remaining)
    this.startCountdown();
  }

  // Initializes a repeating timer to refresh the worker's flight data every 60 seconds
  private startAutoRefresh(workerId: number): void {
    this.timerSubs.add(
      timer(60000, 60000).subscribe(() => {
        this.appStateService.loadFlightsForWorker(workerId);
      })
    );
  }

  // Starts a countdown timer that ticks every second
  private startCountdown(): void {
    this.appStateService.resetCountdown();
    this.timerSubs.add(
      timer(0, 1000).subscribe(() => {
        this.appStateService.decrementCountdown();
      })
    );
  }

  // Stops all existing timers and resets the subscription container
  private cleanupTimers(): void {
    this.timerSubs.unsubscribe();
    this.timerSubs = new Subscription();
  }
}
