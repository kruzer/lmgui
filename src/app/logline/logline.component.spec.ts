import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoglineComponent } from './logline.component';

describe('LoglineComponent', () => {
  let component: LoglineComponent;
  let fixture: ComponentFixture<LoglineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoglineComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LoglineComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('logData', {
      topic: 'response',
      url: '/api/device/signal',
      date: Date.now(),
      response: { rssi: '-60dBm' }
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits the log entry when deleted', () => {
    let emitted: any = null;
    component.delEvent.subscribe(value => (emitted = value));

    component.deleteMe();

    expect(emitted).toBe(component.logData());
  });
});
