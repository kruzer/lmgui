import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../api.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-signal',
  templateUrl: './signal.component.html',
  styleUrls: ['./signal.component.css']
})

export class SignalComponent implements OnInit, OnDestroy {
  private zegar$: Subscription;
  public sig: any[];
  public dev: any[];
  public traf: any[];

  public rssi = [{
    "name": "RSSI",
    "series": [{ "name": "0", "value": 0.123 }]
  }];
  public sinr = [{
    "name": "SINR",
    "series": [{ "name": "0", "value": 0.123 }]
  }];
  public rsrp = [{
    "name": "RSRP",
    "series": [{ "name": "0", "value": 0.123 }]
  }];
  public rsrq = [{
    "name": "RSRQ",
    "series": [{ "name": "0", "value": 0.123 }]
  }];
  public download = [{
    "name": "DOWN",
    "series": [{ "name": "0", "value": 0.123 }]
  }];
  public upload = [{
    "name": "UPLO",
    "series": [{ "name": "0", "value": 0.123 }]
  }];
  view: any[] = [330, 200];
  counter: number = 0;
  counterTraf: number = 0;
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

  colorScheme = {
    domain: ['#ffffff', '#A10A28', '#C7B42C', '#AA00AA']
  };

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.zegar$ = interval(1000).subscribe( x => {
      //console.log(this.zegar$);
      this.showSignal();
    })
  }

  ngOnDestroy(){
    this.zegar$.unsubscribe();
  }

  showSignal() {
    this.apiService.getDeviceSignal().subscribe(data => {
      this.sig = data['response'];

      const level_rsrq=parseInt(data['response']['rsrq']);
      const level_rsrp=parseInt(data['response']['rsrp']);
      const level_sinr=parseInt(data['response']['sinr']);
      const level_rssi=parseInt(data['response']['rssi']);
      this.addData(level_rsrq, level_rsrp, level_sinr, level_rssi);
    });
    this.apiService.getTraffic().subscribe(data => {
      const download=parseInt(data['response']['CurrentDownloadRate']);
      const upload=parseInt(data['response']['CurrentUploadRate']);
      this.traf=data['response'];
      this.addDataTraf(download/(1024*1024), upload/(1024*1024) );
    });
    this.apiService.getDeviceInfo().subscribe(data => {
      this.dev = data['response'];
    })
  }

  addData(level_rsrq: number, level_rsrp: number, level_sinr: number, level_rssi:number) {
    if (this.rsrq[0].series.length > 120 || this.rsrq[0].series[0].value==0.123) {
      this.rsrq[0].series.shift();
      this.rsrp[0].series.shift();
      this.sinr[0].series.shift();
      this.rssi[0].series.shift();
    }
    const data_rsrq =
    {
      "name": this.counter.toString(),
      "value": level_rsrq
    }
    this.rsrq[0].series.push(data_rsrq);
    this.rsrq = [...this.rsrq];

    const data_rsrp =
    {
      "name": this.counter.toString(),
      "value": level_rsrp
    }
    this.rsrp[0].series.push(data_rsrp);
    this.rsrp = [...this.rsrp];

    const data_sinr =
    {
      "name": this.counter.toString(),
      "value": level_sinr
    }
    this.sinr[0].series.push(data_sinr);
    this.sinr = [...this.sinr];

    const data_rssi =
    {
      "name": this.counter.toString(),
      "value": level_rssi
    }
    this.rssi[0].series.push(data_rssi);
    this.rssi = [...this.rssi];

    this.counter++;
  }

  addDataTraf(download: number, upload: number) {
    if (this.download[0].series.length > 120 || this.download[0].series[0].value==0.123) {
      this.download[0].series.shift();
      this.upload[0].series.shift();
    }
    const data_d =
    {
      "name": this.counterTraf.toString(),
      "value": download
    }
    this.download[0].series.push(data_d);
    this.download = [...this.download];

    const data_u =
    {
      "name": this.counterTraf.toString(),
      "value": upload
    }
    this.upload[0].series.push(data_u);
    this.upload = [...this.upload];

    this.counterTraf++;
  }

  onSelect(someEvent){

  }

}
