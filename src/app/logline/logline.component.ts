import { Component, input, output, signal } from '@angular/core';
import { DatePipe, KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-logline',
  imports: [DatePipe, KeyValuePipe],
  templateUrl: './logline.component.html',
  styleUrl: './logline.component.css'
})
export class LoglineComponent {

  readonly logData = input.required<any>();
  readonly delEvent = output<any>();

  readonly hidden = signal(true);

  toggle() {
    this.hidden.update(value => !value);
  }

  deleteMe() {
    this.delEvent.emit(this.logData());
  }

}
