import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';
import { Config } from '../config';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  config: Config = <Config>{};
  //interface config: Config = <Config>{}; - also works for class
  //class config: Config = new Config( ...)


  constructor(private configService: ConfigService) { }

  ngOnInit() {
    this.showConfig();
  }

  setConfig() {
    this.configService.setConfig({"config": this.config})
      .subscribe((data: any) => {
        console.info(data);
        this.resetFields();        
        this.showConfig();
      });
  }

  resetFields(){
    this.config.server='';
    this.config.user='';
    this.config.password='';
  }

  showConfig() {
    this.configService.getConfig()
      .subscribe((data: any) => {
          this.config = data.config;
          console.info(data);
      });
  }

}
