import { Component } from '@angular/core';
import { WorkersListComponent } from '../widgets/workers-list/workers-list.component';
import { FlightsComponent } from '../widgets/flights/flights.component';
import { FlightInfoComponent } from '../widgets/flight-info/flight-info.component';

@Component({
  selector: 'app-main',
  imports: [
    WorkersListComponent,
    FlightsComponent,
    FlightInfoComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
