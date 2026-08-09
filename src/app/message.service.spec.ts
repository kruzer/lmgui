import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should collect and clear messages', () => {
    service.add('hello');
    expect(service.messages()).toContain('hello');

    service.clear();
    expect(service.messages()).toEqual(['cleaned']);
  });
});
