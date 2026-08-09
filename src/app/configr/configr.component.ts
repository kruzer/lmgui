import { Component, OnInit, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ConfigService } from '../config.service';

@Component({
  selector: 'app-configr',
  imports: [ReactiveFormsModule],
  templateUrl: './configr.component.html',
  styleUrl: './configr.component.css'
})
export class ConfigrComponent implements OnInit {

  private configService = inject(ConfigService);

  configForm = new FormGroup({
    server: new FormControl('', [Validators.required, Validators.minLength(3)]),
    user: new FormControl(''),
    password: new FormControl('')
  });

  get server() { return this.configForm.controls.server; }
  get user() { return this.configForm.controls.user; }
  get password() { return this.configForm.controls.password; }

  /**
   * Value/status/touched/pristine changes of the form, as a signal.
   * The view is zoneless, so control state read in the template has to be
   * wrapped in `track()` — otherwise nothing tells Angular to re-render.
   */
  private readonly formEvents = toSignal(this.configForm.events);

  private track<T>(read: () => T) {
    return computed(() => {
      this.formEvents();
      return read();
    });
  }

  readonly serverInvalid = this.track(() => this.server.invalid && this.server.touched);
  readonly serverWarn = this.track(() => this.server.dirty && this.server.valid);
  readonly serverHideError = this.track(() => this.server.valid || this.server.pristine);

  readonly userInvalid = this.track(() => this.user.invalid && this.user.touched);
  readonly userWarn = this.track(() => this.user.dirty && this.user.valid);
  readonly userHideError = this.track(() => this.user.valid || this.user.pristine);

  readonly passwordInvalid = this.track(() => this.password.invalid && this.password.touched);
  readonly passwordWarn = this.track(() => this.password.dirty && this.password.valid);

  readonly submitDisabled = this.track(() => this.configForm.invalid || this.configForm.pristine);

  ngOnInit() {
    this.showConfig();
  }

  showConfig() {
    this.configService.getConfig()
      .subscribe((data: any) => {
        if (data?.config) {
          this.configForm.patchValue(data.config);
        }
        console.info(data);
      });
  }

  setConfig() {
    this.configService.setConfig({ config: this.configForm.value })
      .subscribe({
        next: data => {
          this.configForm.reset();
          if (data?.['config']) {
            this.configForm.patchValue(data['config']);
          }
        },
        error: error => console.error('Error!', error)
      });
  }

  onSubmit() {
    this.setConfig();
  }

}
