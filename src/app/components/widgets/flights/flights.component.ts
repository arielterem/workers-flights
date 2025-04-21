import { Component, computed, signal } from '@angular/core';
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
export class FlightsComponent {

  constructor(
    public appStateService: AppStateService
  ) { }

  // Column definitions used for rendering the table header and data
  columnDefs = signal<Array<{ name: string, label: string }>>([
    { name: 'num', label: 'Flight Number' },
    { name: 'from', label: 'Origin' },
    { name: 'from_date', label: 'Origin Date' },
    { name: 'to', label: 'Destination' },
    { name: 'to_date', label: 'Destination Date' }
  ]);

  // Dynamically compute the list of column field names to be used by the Angular Material table
  displayedColumns = computed(() => this.columnDefs().map(item => item.name));

  // Triggered when a user clicks on a row; updates the selected flight in the shared app state
  selectRow(flight: IFlight) {
    this.appStateService.setSelectedFlight(flight);
  }
}
