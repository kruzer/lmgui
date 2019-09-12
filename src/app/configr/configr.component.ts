import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-configr',
  templateUrl: './configr.component.html',
  styleUrls: ['./configr.component.css']
})
export class ConfigrComponent implements OnInit {
/*
  server = new FormControl('');
  user = new FormControl('');
  password = new FormControl('');
*/
  configForm = new FormGroup({
    server: new FormControl('',[Validators.required, Validators.minLength(3)]),
    user: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private configService: ConfigService) { }

    ngOnInit() {
    this.showConfig();
  }

  showConfig() {
    this.configService.getConfig()
      .subscribe((data: any) => {
        this.configForm.patchValue(data.config);
        console.info(data);
      });
  }

  setConfig() {
    this.configService.setConfig({ "config": this.configForm.value })
      .subscribe(
        data => {
          this.configForm.reset();
          this.configForm.patchValue(data['config']);
        },
        error => console.error('Error!', error));
  }

  onSubmit() {
    this.setConfig();
  }
}
