import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Traffic } from '../traffic';
import { interval } from 'rxjs';

@Component({
  selector: 'app-router',
  templateUrl: './router.component.html',
  styleUrls: ['./router.component.css']
})
export class RouterComponent implements OnInit {
  myTraffic: Traffic;
  myDevice: any;
  mySignal: any;
  zegar$;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.zegar$ = interval(1000).subscribe( x => {
      //console.log(this.zegar$);
      this.showTraffic();
      this.showDevice();
      this.showSignal();
    })
  }

  ngOnDestroy(){
    this.zegar$.unsubscribe();
  }

  showTraffic() {
    this.apiService.getTraffic().subscribe(dane => this.myTraffic = dane['response']);
  }

  showSignal() {
    this.apiService.getDeviceSignal().subscribe(dane => this.mySignal = dane['response']);
  }

  showDevice() {
    this.apiService.getDeviceInfo().subscribe(dane => { 
      this.myDevice = dane['response'];
    });
  }
  

}

  //    this.trafficService.getTraffic()
  //    .subscribe(data: any => this.myTraffic = response);
//  this.trafficService.getTraffic().subscribe(data => this.myTraffic = data['response']);

  /*
  showTraffic() {
    this.trafficService.getTraffic()
      .subscribe((data: any) => {
          this.CurrentConnectTime = data['CurrentConnectTime'],
          this.CurrentUpload = data['CurrentUpload'],
          this.CurrentDownload = data.response.CurrentDownload,
          this.CurrentDownloadRate = data.response.CurrentDownloadRate,
          this.CurrentUploadRate = data.response.CurrentUploadRate,
          this.TotalUpload = data.response.TotalUpload,
          this.TotalDownload = data.response.TotalDownload,
          this.TotalConnectTime = data.response.TotalConnectTime
      });
  }*/
