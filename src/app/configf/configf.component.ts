import { Component, OnInit, inject, signal, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { Config } from '../config';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-configf',
  imports: [FormsModule],
  templateUrl: './configf.component.html',
  styleUrl: './configf.component.css'
})
export class ConfigfComponent implements OnInit {

  private configService = inject(ConfigService);

  readonly config = signal<Config>({} as Config);
  readonly myForm = viewChild<NgForm>('formularz');

  ngOnInit() {
    this.showConfig();
  }

  /** ngModel writes go through here so the signal — and the view — stay in sync. */
  setField(key: keyof Config, value: string) {
    this.config.update(current => ({ ...current, [key]: value }));
  }

  setConfig() {
    this.configService.setConfig({ config: this.config() })
      .subscribe({
        next: data => this.config.set(data?.['config'] ?? ({} as Config)),
        error: error => console.error('Error!', error)
      });
  }

  showConfig() {
    this.configService.getConfig()
      .subscribe((data: any) => {
        this.config.set(data?.config ?? ({} as Config));
        console.info(data);
      });
  }

  onSubmit() {
    this.setConfig();
    this.myForm()?.reset();
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.config()); }

}
