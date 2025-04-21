import { Component, OnInit } from '@angular/core';
import { PullDataService } from '../../../services/pull-data.service';
import { AppStateService } from '../../../services/app-state.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { IFlight } from '../../../interfaces/flight.interface';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-flights',
  imports: [MatTableModule, CommonModule, MatCardModule],
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.scss'
})
export class FlightsComponent implements OnInit{



  constructor(
    private pullDataService: PullDataService,
    public appStateService: AppStateService
  ) { }

  ngOnInit(): void {
   console.log(this.appStateService.getFlightsList());
  }
  displayedColumns: string[] = ['num', 'from', 'from_date', 'to', 'to_date'];

  selectRow(flight: IFlight) {
    this.appStateService.setSelectedFlight(flight);
  }
  

}
