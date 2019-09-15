import { Component, OnInit, VERSION } from '@angular/core';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private configService: ConfigService) { }
  public AngularVersion: string;
  public BoostVersion: string;
  public AppVersion: string;

  ngOnInit() {
    this.AngularVersion = VERSION.full;
    this.getVersion();
  }

  getVersion() {
    this.configService.getConfig()
      .subscribe((data: any) => {
        this.BoostVersion = data.config.boostVersion,
        this.AppVersion = data.config.appVersion;
      });
    }

}
