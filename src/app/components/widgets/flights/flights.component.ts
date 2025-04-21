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


  // Make columnDefs a signal
  columnDefs = signal<Array<{ name: string, label: string }>>([
    { name: 'num', label: 'Flight Number' },
    { name: 'from', label: 'Origin' },
    { name: 'from_date', label: 'Origin Date' },
    { name: 'to', label: 'Destination' },
    { name: 'to_date', label: 'Destination Date' }
  ]);

  // Compute displayed columns using the 'name' property
  displayedColumns = computed(() => this.columnDefs().map(item => item.name));
  // Method called when a row is clicked — sets the selected flight in the shared state

  selectRow(flight: IFlight) {
    this.appStateService.setSelectedFlight(flight);
  }


}
