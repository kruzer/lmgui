import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ConsoleComponent } from './console.component';

describe('ConsoleComponent', () => {
  let component: ConsoleComponent;
  let fixture: ComponentFixture<ConsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsoleComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('fills the url field from an example link', () => {
    component.setURL('/api/device/signal');
    expect(component.myForm.value.url).toBe('/api/device/signal');
  });

  it('switches the visible tab', () => {
    expect(component.activeTab()).toBe(0);

    component.selectTab(2);
    fixture.detectChanges();

    expect(component.activeTab()).toBe(2);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('textarea[formControlName="rawoutput"]')).toBeTruthy();
  });

  it('removes a log entry', () => {
    const entry = { topic: 'response' };
    component.responses.set([entry]);

    component.doDeleteLog(entry);

    expect(component.responses()).toEqual([]);
  });
});
