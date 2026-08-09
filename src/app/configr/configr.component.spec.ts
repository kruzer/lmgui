import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ConfigrComponent } from './configr.component';

describe('ConfigrComponent', () => {
  let component: ConfigrComponent;
  let fixture: ComponentFixture<ConfigrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigrComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('marks the server field as required', () => {
    component.configForm.patchValue({ server: '' });
    expect(component.server.valid).toBe(false);

    component.configForm.patchValue({ server: '192.168.1.1' });
    expect(component.server.valid).toBe(true);
  });
});
