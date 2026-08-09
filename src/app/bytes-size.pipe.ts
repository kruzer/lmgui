import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bytesSize'
})
export class BytesSizePipe implements PipeTransform {

  private units = [
    'bytes',
    'KB',
    'MB',
    'GB',
    'TB',
    'PB'
  ];

  transform(bytes = 0, precision = 2, suffix = ''): string {
    if (isNaN(parseFloat(String(bytes))) || !isFinite(bytes)) return '?';
    let unit = 0;
    if(bytes < 1024) precision = 0;
    while (bytes >= 1024) {
      bytes /= 1024;
      unit++;
    }
    return (bytes*1).toFixed(+ precision) + ' ' + this.units[unit] + suffix;
  }
}
