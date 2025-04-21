import { Component, OnInit } from '@angular/core';
import { PullDataService } from '../../../services/pull-data.service';
import { IWorker } from '../../../interfaces/worker.interface';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { AppStateService } from '../../../services/app-state.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-workers-list',
  imports: [CommonModule, MatListModule, MatCardModule],
  templateUrl: './workers-list.component.html',
  styleUrl: './workers-list.component.scss'
})
export class WorkersListComponent implements OnInit {

  workersList: IWorker[] = []

  constructor(
    private pullDataService: PullDataService,
    public appStateService: AppStateService
  ) { }

  ngOnInit(): void {
    console.log('here');
    this.pullDataService.getWorkersList().subscribe({
      next: (res) => {
        this.workersList = res
        console.log(this.workersList);
      },
      error(err) {
        console.log(err);
      },
    })
  }

  onSelectWorker(workerID: number) {
    this.appStateService.setSelectedWorkerID(workerID)
  }
  
}
