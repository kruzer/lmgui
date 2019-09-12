import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';
import { Config } from '../config';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-configf',
  templateUrl: './configf.component.html',
  styleUrls: ['./configf.component.css']
})

export class ConfigfComponent implements OnInit {
  config: Config = <Config>{};
  @ViewChild('formularz') myForm: any;

  constructor(private configService: ConfigService) { }

  ngOnInit() {
    this.showConfig();
  }

  setConfig() {
    this.configService.setConfig({ "config": this.config })
      .subscribe(
        data => {
          this.config = data['config'];
        },
        error => console.error('Error!', error));
  }

  showConfig() {
    this.configService.getConfig()
      .subscribe((data: any) => {
        this.config = data.config;
        console.info(data);
      });
  }

  onSubmit() {
    this.setConfig();
    this.myForm.reset();
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.config); }

}
