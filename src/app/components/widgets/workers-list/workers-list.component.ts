import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { IWorker } from '../../../interfaces/worker.interface';
import { AppStateService } from '../../../services/app-state.service';
import { PullDataService } from '../../../services/pull-data.service';
import { Subscription } from 'rxjs';
import { effect } from '@angular/core';
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

  workersList: IWorker[] = [];
  private refreshSub: Subscription | null = null;

  constructor(
    public appStateService: AppStateService,
    private pullDataService: PullDataService
  ) {}

  ngOnInit(): void {
    this.loadWorkers();
  }

  ngOnDestroy(): void {
    this.refreshSub?.unsubscribe();
  }

  loadWorkers(): void {
    this.pullDataService.getWorkersList().subscribe({
      next: (res) => this.workersList = res,
      error: (err) => console.error(err)
    });
  }

  onSelectWorker(id: number): void {
    this.appStateService.setSelectedWorkerID(id);
  }
}
