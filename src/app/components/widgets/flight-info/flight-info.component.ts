import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AppStateService } from '../../../services/app-state.service';
import { DurationPipe } from '../../../pipes/duration.pipe';

@Component({
  selector: 'app-flight-info',
  standalone: true,
  imports: [CommonModule, MatCardModule, DurationPipe],
  templateUrl: './flight-info.component.html',
  styleUrl: './flight-info.component.scss'
})
export class FlightInfoComponent {

  constructor(public appStateService: AppStateService) {}

}
