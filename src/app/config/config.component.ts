import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Config } from '../config';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-config',
  imports: [FormsModule],
  templateUrl: './config.component.html',
  styleUrl: './config.component.css'
})
export class ConfigComponent implements OnInit {

  private configService = inject(ConfigService);

  readonly config = signal<Config>({} as Config);

  ngOnInit() {
    this.showConfig();
  }

  /** ngModel writes go through here so the signal — and the view — stay in sync. */
  setField(key: keyof Config, value: string) {
    this.config.update(current => ({ ...current, [key]: value }));
  }

  setConfig() {
    this.configService.setConfig({ config: this.config() })
      .subscribe((data: any) => {
        console.info(data);
        this.resetFields();
        this.showConfig();
      });
  }

  resetFields() {
    this.config.set({ server: '', user: '', password: '' });
  }

  showConfig() {
    this.configService.getConfig()
      .subscribe((data: any) => {
        this.config.set(data?.config ?? ({} as Config));
        console.info(data);
      });
  }

}
