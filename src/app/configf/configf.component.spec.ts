import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ConfigfComponent } from './configf.component';

describe('ConfigfComponent', () => {
  let component: ConfigfComponent;
  let fixture: ComponentFixture<ConfigfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigfComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
