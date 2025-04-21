import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value == null || isNaN(value)) return '';

    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    const h = hours ? `${hours}h` : '';
    const m = minutes ? `${minutes}m` : '';

    return [h, m].filter(Boolean).join(' ');
  }
}
