import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ApiService } from '../api.service';

interface Series {
  name: string;
  series: { name: string; value: number }[];
}

/** Number of samples kept on each chart. */
const MAX_SAMPLES = 120;
/** Placeholder value of the seed sample, dropped as soon as real data arrives. */
const SEED_VALUE = 0.123;

function seed(name: string): Series[] {
  return [{ name, series: [{ name: '0', value: SEED_VALUE }] }];
}

@Component({
  selector: 'app-signal',
  imports: [NgxChartsModule],
  templateUrl: './signal.component.html',
  styleUrl: './signal.component.css'
})
export class SignalComponent implements OnInit, OnDestroy {

  private apiService = inject(ApiService);

  private zegar$?: Subscription;

  readonly sig = signal<any>({});
  readonly dev = signal<any>({});
  readonly traf = signal<any>({});

  readonly rssi = signal<Series[]>(seed('RSSI'));
  readonly sinr = signal<Series[]>(seed('SINR'));
  readonly rsrp = signal<Series[]>(seed('RSRP'));
  readonly rsrq = signal<Series[]>(seed('RSRQ'));
  readonly download = signal<Series[]>(seed('DOWN'));
  readonly upload = signal<Series[]>(seed('UPLO'));

  view: [number, number] = [330, 200];
  counter = 0;
  counterTraf = 0;

  // options
  showXAxis = false;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'time';
  showYAxisLabel = false;
  yAxisLabel = 'dBm';
  autoScale = true;

  colorScheme: any = {
    domain: ['#ffffff', '#A10A28', '#C7B42C', '#AA00AA']
  };

  ngOnInit() {
    this.zegar$ = interval(1000).subscribe(() => this.showSignal());
  }

  ngOnDestroy() {
    this.zegar$?.unsubscribe();
  }

  showSignal() {
    this.apiService.getDeviceSignal().subscribe(data => {
      const response = data['response'];
      if (!response) {
        return;
      }
      this.sig.set(response);
      this.addData(
        parseInt(response['rsrq'], 10),
        parseInt(response['rsrp'], 10),
        parseInt(response['sinr'], 10),
        parseInt(response['rssi'], 10)
      );
    });
    this.apiService.getTraffic().subscribe(data => {
      const response = data['response'];
      if (!response) {
        return;
      }
      this.traf.set(response);
      this.addDataTraf(
        parseInt(response['CurrentDownloadRate'], 10) / (1024 * 1024),
        parseInt(response['CurrentUploadRate'], 10) / (1024 * 1024)
      );
    });
    this.apiService.getDeviceInfo().subscribe(data => {
      this.dev.set(data['response'] ?? {});
    });
  }

  /** Pushes one sample and drops the oldest once the window is full. */
  private push(target: ReturnType<typeof signal<Series[]>>, value: number, label: string, drop: boolean) {
    target.update(prev => {
      const series = drop ? prev[0].series.slice(1) : prev[0].series.slice();
      series.push({ name: label, value });
      return [{ name: prev[0].name, series }];
    });
  }

  private shouldDrop(current: Series[]): boolean {
    return current[0].series.length > MAX_SAMPLES || current[0].series[0].value === SEED_VALUE;
  }

  addData(level_rsrq: number, level_rsrp: number, level_sinr: number, level_rssi: number) {
    const label = this.counter.toString();
    const drop = this.shouldDrop(this.rsrq());

    this.push(this.rsrq, level_rsrq, label, drop);
    this.push(this.rsrp, level_rsrp, label, drop);
    this.push(this.sinr, level_sinr, label, drop);
    this.push(this.rssi, level_rssi, label, drop);

    this.counter++;
  }

  addDataTraf(download: number, upload: number) {
    const label = this.counterTraf.toString();
    const drop = this.shouldDrop(this.download());

    this.push(this.download, download, label, drop);
    this.push(this.upload, upload, label, drop);

    this.counterTraf++;
  }

  onSelect() {
    // no-op, kept for the chart's (select) binding
  }

}
