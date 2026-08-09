import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private readonly _messages = signal<string[]>([]);

  /** Read-only view of the collected messages. */
  readonly messages = this._messages.asReadonly();

  add(message: string) {
    this._messages.update(messages => [...messages, message]);
  }

  clear() {
    this._messages.set([]);
    this.add('cleaned');
  }
}
