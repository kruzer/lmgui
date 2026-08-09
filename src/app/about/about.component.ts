import { Component, OnInit, VERSION, inject, signal } from '@angular/core';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {

  private configService = inject(ConfigService);

  readonly AngularVersion = signal('');
  readonly BoostVersion = signal('');
  readonly AppVersion = signal('');

  ngOnInit() {
    this.AngularVersion.set(VERSION.full);
    this.getVersion();
  }

  getVersion() {
    this.configService.getConfig()
      .subscribe((data: any) => {
        this.BoostVersion.set(data?.config?.boostVersion ?? '');
        this.AppVersion.set(data?.config?.appVersion ?? '');
      });
  }

}
