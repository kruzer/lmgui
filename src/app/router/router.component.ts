import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { Subscription, interval } from 'rxjs';

import { ApiService } from '../api.service';
import { BytesSizePipe } from '../bytes-size.pipe';
import { SecondsToTimePipe } from '../seconds-to-time.pipe';
import { Traffic } from '../traffic';

@Component({
  selector: 'app-router',
  imports: [BytesSizePipe, SecondsToTimePipe],
  templateUrl: './router.component.html',
  styleUrl: './router.component.css'
})
export class RouterComponent implements OnInit, OnDestroy {

  private apiService = inject(ApiService);

  readonly myTraffic = signal<Traffic | undefined>(undefined);
  readonly myDevice = signal<any>(undefined);
  readonly mySignal = signal<any>(undefined);

  private zegar$?: Subscription;

  ngOnInit() {
    this.zegar$ = interval(1000).subscribe(() => {
      this.showTraffic();
      this.showDevice();
      this.showSignal();
    });
  }

  ngOnDestroy() {
    this.zegar$?.unsubscribe();
  }

  showTraffic() {
    this.apiService.getTraffic().subscribe(dane => this.myTraffic.set(dane['response']));
  }

  showSignal() {
    this.apiService.getDeviceSignal().subscribe(dane => this.mySignal.set(dane['response']));
  }

  showDevice() {
    this.apiService.getDeviceInfo().subscribe(dane => this.myDevice.set(dane['response']));
  }

}
