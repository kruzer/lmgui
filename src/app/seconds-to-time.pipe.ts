import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToTime'
})
export class SecondsToTimePipe implements PipeTransform {

  private readonly times: Record<string, number> = {
    year: 31557600,
    month: 2629746,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };

  transform(seconds: number | null | undefined): string {
    let time_string = '';
    let rest = Number(seconds);
    if (isNaN(rest) || !isFinite(rest)) {
      return '';
    }
    for (const key of Object.keys(this.times)) {
      const unit = this.times[key];
      const count = Math.floor(rest / unit);
      if (count > 0) {
        const plural = count > 1 ? 's' : '';
        time_string += count.toString() + ' ' + key + plural + ' ';
        rest = rest - unit * count;
      }
    }
    return time_string;
  }

}
